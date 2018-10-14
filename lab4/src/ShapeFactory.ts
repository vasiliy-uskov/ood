import {IShapeFactory} from "./IShapeFactory"
import {Shape} from "./shape/Shape"
import {Polygon} from "./shape/Polygon"
import {Triangle} from "./shape/Triangle"
import {Ellipse} from "./shape/Ellipse"
import {Rectangle} from "./shape/Rectangle"
import {ShapeType} from "./shape/ShapeTypes"
import {Vec2} from "./Vec2";
import {Color} from "./Color";

class ShapeFactory implements IShapeFactory {
    createShape(shapeDescription: Object): Shape {
        this._verifyObject(shapeDescription);
        switch (shapeDescription["type"]) {
            case ShapeType.Triangle:
                return this._createTriangle(shapeDescription);
            case ShapeType.Rectangle:
                return this._createRectangle(shapeDescription);
            case ShapeType.Polygon:
                return this._createPolygon(shapeDescription);
            case ShapeType.Ellipse:
                return this._createEllipse(shapeDescription);
            default:
                throw new Error("Incorrect shape description");
        }
    }

    private  _createEllipse(shapeDescription: Object): Ellipse {
        const color = this._verifyColor(shapeDescription["color"]);
        const radiusX = this._verifyNumber(shapeDescription["radiusX"]);
        const radiusY = this._verifyNumber(shapeDescription["radiusY"]);
        const center = this._verifyPoint(shapeDescription["center"]);
        return new Ellipse(color, new Vec2(center.x, center.y), radiusX, radiusY);
    }

    private _createPolygon(shapeDescription: Object): Polygon {
        const color = this._verifyColor(shapeDescription["color"]);
        const vertexes = shapeDescription["vertexes"];
        const vec2List = [];
        for (const vertex of vertexes) {
            this._verifyPoint(vertex);
            vec2List.push(new Vec2(vertex.x, vertex.y));
        }
        return new Polygon(color, vec2List);
    }

    private _createTriangle(shapeDescription: Object): Triangle {
        const color = this._verifyColor(shapeDescription["color"]);
        const vertex1 = this._verifyPoint(shapeDescription["vertex1"]);
        const vertex2 = this._verifyPoint(shapeDescription["vertex2"]);
        const vertex3 = this._verifyPoint(shapeDescription["vertex3"]);
        return new Triangle(color, new Vec2(vertex1.x, vertex1.y), new Vec2(vertex2.x, vertex2.y), new Vec2(vertex3.x, vertex3.y));
    }

    private _createRectangle(shapeDescription: Object): Rectangle {
        const color = this._verifyColor(shapeDescription["color"]);
        const vertex1 = this._verifyPoint(shapeDescription["vertex1"]);
        const vertex2 = this._verifyPoint(shapeDescription["vertex2"]);
        return new Rectangle(color, new Vec2(vertex1.x, vertex1.y), new Vec2(vertex2.x, vertex2.y))
    }

    private _verifyObject(obj: Object): Object {
        if (typeof obj !== "object") {
            throw new Error("Invalid input type");
        }
        return obj;
    }

    private _verifyNumber(num: number): number {
        if (typeof num !== "number" && !isNaN(num)) {
            throw new Error("Invalid input type");
        }
        return num;
    }

    private _verifyColor(color: number): Color {
        if (color != Color.Black
            && color != Color.Blue
            && color != Color.Yellow
            && color != Color.Green
            && color != Color.Red
            && color != Color.Pink) {
            throw new Error("Invalid input type");
        }
        return <Color>color;
    }

    private _verifyPoint(point: {x: number, y: number}): {x: number, y: number} {
        this._verifyObject(point);
        this._verifyNumber(point.x);
        this._verifyNumber(point.y);
        return point;
    }
}

export {ShapeFactory};