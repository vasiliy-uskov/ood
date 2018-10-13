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
        const color = shapeDescription["color"];
        switch (shapeDescription["type"]) {
            case ShapeType.Triangle: {
                const vertex1 = shapeDescription["vertex1"];
                const vertex2 = shapeDescription["vertex2"];
                const vertex3 = shapeDescription["vertex3"];
                return new Triangle(color, new Vec2(vertex1.x, vertex1.y), new Vec2(vertex2.x, vertex2.y), new Vec2(vertex3.x, vertex3.y));
            }
            case ShapeType.Rectangle: {
                const vertex1 = shapeDescription["vertex1"];
                const vertex2 = shapeDescription["vertex2"];
                return new Rectangle(color, new Vec2(vertex1.x, vertex1.y), new Vec2(vertex2.x, vertex2.y))
            }
            case ShapeType.Polygon: {
                const vertexes = shapeDescription["vertexes"];
                const vec2List = [];
                for (const vertex of vertexes) {
                    vec2List.push(new Vec2(vertex.x, vertex.y));
                }
                return new Polygon(color, vec2List);
            }
            case ShapeType.Ellipse: {
                const radiusX = shapeDescription["radiusX"];
                const radiusY = shapeDescription["radiusY"];
                const center = shapeDescription["center"];
                return new Ellipse(color, new Vec2(center.x, center.y), radiusX, radiusY);
            }
            default:
                throw new Error("Incorrect shape description");
        }
    }
}

export {ShapeFactory};