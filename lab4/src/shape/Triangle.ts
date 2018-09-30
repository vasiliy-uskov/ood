import {Shape} from "./Shape"
import {Vec2} from "../Vec2"
import {Color} from "../Color"
import {ICanvas} from "../ICanvas"

class Triangle extends Shape {
    constructor(color: Color, vertex1: Vec2, vertex2: Vec2, vertex3: Vec2) {
        super(color);
        this._vertexes.push(vertex1);
        this._vertexes.push(vertex2);
        this._vertexes.push(vertex3);
    }

    public draw(canvas: ICanvas) {
        canvas.setColor(this._color);
        canvas.drawLine(this._vertexes[0], this._vertexes[1]);
        canvas.drawLine(this._vertexes[1], this._vertexes[2]);
        canvas.drawLine(this._vertexes[2], this._vertexes[0]);
    }

    private _vertexes: Array<Vec2>;
}

export {Triangle}