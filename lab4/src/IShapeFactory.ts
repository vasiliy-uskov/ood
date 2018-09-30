import {Shape} from "./shape/Shape";

interface IShapeFactory {
    createShape(shapeDescription: Object): Shape;
}

export {IShapeFactory};