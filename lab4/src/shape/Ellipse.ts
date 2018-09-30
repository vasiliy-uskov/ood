import {Shape} from "./Shape"
import {Vec2} from "../Vec2"
import {Color} from "../Color"
import {ICanvas} from "../ICanvas"

class Ellipse extends Shape {
    constructor(color: Color, center: Vec2, radiusX: number, radiusY: number) {
        super(color);
        this._center = center;
        this._radiusX = radiusX;
        this._radiusY = radiusY;
    }

    public draw(canvas: ICanvas) {
        canvas.setColor(this._color);
        canvas.drawArc(this._center, this._radiusX, this._radiusY, 0, Math.PI * 2);
    }

    private _center: Vec2;
    private _radiusX: number;
    private _radiusY: number;
}

export {Ellipse}