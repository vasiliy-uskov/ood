import {ICanvas} from "../src/ICanvas";
import {Color} from "../src/Color";
import {Vec2} from "../src/Vec2";

class MockCanvas implements ICanvas {
    setColor(color: Color) {
        this._color = color;
    }

    drawLine(from: Vec2, to: Vec2) {
        this._primitives.push({type: "line", color: this._color, from, to});
    }

    drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number) {
        this._primitives.push({type: "arc", color: this._color, center, radiusX, radiusY, startAngle, angle});
    }

    close() {
        this._primitives.push({type: "close"})
    }

    primitives(): Array<Object> {
        return this._primitives.slice();
    }

    private _primitives: Array<Object> = [];
    private _color: Color = Color.Black;
}

export {MockCanvas}