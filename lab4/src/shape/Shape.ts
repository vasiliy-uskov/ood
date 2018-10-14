import {Color} from "../Color";
import {ICanvas} from "../ICanvas";

abstract class Shape {
    constructor(color: Color) {
        this._color = color;
    }

    public getColor() : Color {
        return this._color;
    }

    public draw(canvas: ICanvas) {
        canvas.setColor(this._color);
        this._drawShape(canvas);
        canvas.close();

    }

    protected abstract _drawShape(canvas: ICanvas);

    protected _color: Color;
}

export {Shape};