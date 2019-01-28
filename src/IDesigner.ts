import {Shape} from "./shape/Shape";

interface IDesigner {
    createDraft(shapesDescription: Array<Object>): Array<Shape>;
}

export {IDesigner};