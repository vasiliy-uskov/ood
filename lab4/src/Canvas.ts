import {Color} from "./Color";
import {ICanvas} from "./ICanvas";
import {Vec2} from "./Vec2";

class Canvas implements ICanvas {
    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    setColor(color: Color) {
        this._addCurrentPath();
        this._currentColor = color;
    }

    drawLine(from: Vec2, to: Vec2) {
        this._initStartPoint(from);
        this._currentPath += ` L ${to.x} ${to.y}`;
        this._lastPoint = to;
    }

    drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number) {
        const drawArc = (startAngle: number, angle: number) => {
            const startPoint = new Vec2(
                center.x + Math.cos(startAngle) * radiusX,
                center.y + Math.sin(startAngle) * radiusY
            );
            const endPoint = new Vec2(
                center.x + Math.cos(startAngle + angle) * radiusX,
                center.y + Math.sin(startAngle + angle) * radiusY
            );
            this._initStartPoint(startPoint);
            this._currentPath += ` A ${radiusX} ${radiusY} ${angle / Math.PI * 180} 0 1 ${endPoint.x} ${endPoint.y}`;
            this._lastPoint = endPoint;
        };
        const arcCount = Math.floor(angle / Math.PI);
        for (let i = 0; i < arcCount; ++i) {
            drawArc(startAngle + Math.PI * i, Math.PI);
        }
        if (angle - arcCount * Math.PI) {
            drawArc(startAngle + Math.PI * arcCount, angle - arcCount * Math.PI);
        }
    }

    close() {
        this._currentPath += " Z";
        this._addCurrentPath();
    }

    getPicture(): string {
        this._addCurrentPath();
        let result = `<svg width="${this._width}px" height="${this._height}px">`;
        for (const {color, path} of this._paths) {
            result += `<path fill="${color}" d="${path}"></path>`;
        }
        result += "</svg>";
        return result;
    }

    _addCurrentPath() {
        if (this._currentPath.length) {
            this._paths.push({
                color: this._colorToString(this._currentColor),
                path: this._currentPath
            });
            this._currentPath = "";
            this._lastPoint = null;
        }
    }

    _initStartPoint(lastPoint: Vec2) {
        if (!this._lastPoint || lastPoint.x != this._lastPoint.x && lastPoint.y != this._lastPoint.y) {
            this._lastPoint = lastPoint;
            this._currentPath += ` M ${lastPoint.x} ${lastPoint.y}`;
        }
    }

    private _colorToString(color: Color): string {
        switch (color) {
            case Color.Black:
                return "#444";
            case Color.Red:
                return "#F66";
            case Color.Green:
                return "#ACA";
            case Color.Yellow:
                return "#FF8";
            case Color.Pink:
                return "#FCC";
            case Color.Blue:
                return "#66F";
        }
    }

    private _width: number;
    private _height: number;
    private _paths: Array<{path: string, color: string}> = [];
    private _currentPath: string = "";
    private _currentColor: Color = Color.Black;
    private _lastPoint?: Vec2 = null;

}

export {Canvas};