import {Color} from "../Color";
import {ICanvas} from "../ICanvas";

abstract class Shape {
    constructor(color: Color) {
        this._color = color;
    }

    public getColor() : Color {
        return this._color;
    }

    public abstract draw(canvas: ICanvas);

    protected _color: Color;
}

export {Shape};