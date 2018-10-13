import {Color} from "./Color";
import {ICanvas} from "./ICanvas";
import {Vec2} from "./Vec2";

class Canvas implements ICanvas {
    setColor(color: Color) {
        console.log(`use ${this._colorToString(color)} to draw:`);
    }

    drawLine(from: Vec2, to: Vec2) {
        console.log(`  line from (${from.x}:${from.y}) to (${to.x}:${to.y})`);
    }

    drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number) {
        console.log(`  arc with center in (${center.x}:${center.y}), radiusX ${radiusX}, radiusY ${radiusY}, start angle ${startAngle}, angle ${angle}`);
    }

    private _colorToString(color: Color): string {
        switch (color) {
            case Color.Black:
                return "black";
            case Color.Red:
                return "red";
            case Color.Green:
                return "green";
            case Color.Yellow:
                return "yellow";
            case Color.Pink:
                return "pink";
            case Color.Blue:
                return "blue";
        }
    }
}

export {Canvas};