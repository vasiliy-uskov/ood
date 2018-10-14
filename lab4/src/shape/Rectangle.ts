import {Shape} from "./Shape"
import {Vec2} from "../Vec2"
import {Color} from "../Color"
import {ICanvas} from "../ICanvas"

class Rectangle extends Shape {
    constructor(color: Color, vertex1: Vec2, vertex2: Vec2) {
        super(color);
        this._vertexes.push(vertex1);
        this._vertexes.push(vertex2);
    }

    protected _drawShape(canvas: ICanvas) {
        const vertex1 = this._vertexes[0];
        const vertex2 = new Vec2(this._vertexes[1].x, this._vertexes[0].y);
        const vertex3 = this._vertexes[1];
        const vertex4 = new Vec2(this._vertexes[0].x, this._vertexes[1].y);
        canvas.drawLine(vertex1, vertex2);
        canvas.drawLine(vertex2, vertex3);
        canvas.drawLine(vertex3, vertex4);
        canvas.drawLine(vertex4, vertex1);
    }

    private _vertexes: Array<Vec2> = [];
}

export {Rectangle}