import {IDesigner} from "./IDesigner"
import {IShapeFactory} from "./IShapeFactory"
import {Shape} from "./shape/Shape";

class Designer implements IDesigner {
    constructor(shapeFactory: IShapeFactory) {
        this._shapeFactory = shapeFactory;
    }

    public createDraft(shapesDescription: Array<Object>): Array<Shape> {
        const shapes = [];
        for (const shapeDescription of shapesDescription) {
            shapes.push(this._shapeFactory.createShape(shapeDescription));
        }
        return shapes;
    }

    private _shapeFactory: IShapeFactory;
}

export {Designer};