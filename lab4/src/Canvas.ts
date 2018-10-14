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
        this._currentPath += ` M ${from.x} ${from.y}`;
        this._currentPath += ` L ${to.x} ${to.y}`;
    }

    drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number) {
        const startPoint = new Vec2(
            center.x + Math.cos(startAngle) * radiusX,
            center.x + Math.cos(startAngle) * radiusX
        );
        this._currentPath += ` M ${startPoint.x} ${startPoint.y}`;
        this._currentPath += ` A ${radiusX} ${radiusY} ${angle} 0 0`;
    }

    close() {
        this._currentPath += " z";
        this._addCurrentPath();
    }

    getPicture(): string {
        this._addCurrentPath();
        let result = "<svg>";
        for (const {color, path} of this._paths) {
            result += `<path fill="${color}" d="${path}">`;
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

}

export {Canvas};