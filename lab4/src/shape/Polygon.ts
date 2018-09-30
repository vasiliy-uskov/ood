import {Shape} from "./Shape"
import {Vec2} from "../Vec2"
import {Color} from "../Color"
import {ICanvas} from "../ICanvas"

class Polygon extends Shape {
    constructor(color: Color, points: Array<Vec2>) {
        super(color);
        this._points = points;
    }

    public draw(canvas: ICanvas) {
        canvas.setColor(this._color);
        for (let i = 0; i < this._points.length; ++i) {
            if (this._points.length > 1) {
                canvas.drawLine(this._points[i], this._points[i + 1 % this._points.length]);
            }
        }
    }

    private _points: Array<Vec2>;
}

export {Polygon}