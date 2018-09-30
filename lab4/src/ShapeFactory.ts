import {IShapeFactory} from "./IShapeFactory"
import {Shape} from "./shape/Shape"
import {Polygon} from "./shape/Polygon"
import {Triangle} from "./shape/Triangle"
import {Ellipse} from "./shape/Ellipse"
import {Rectangle} from "./shape/Rectangle"
import {ShapeType} from "./shape/ShapeTypes"

class ShapeFactory implements IShapeFactory {
    createShape(shapeDescription: Object): Shape {
        if (typeof shapeDescription["type"] != "number") {
            throw new Error("Incorrect shape description");
        }
        switch (shapeDescription["type"]) {
            case ShapeType.Rectangle:
                return new Rectangle(shapeDescription["color"], )
        }
    }
}

export {ShapeFactory};