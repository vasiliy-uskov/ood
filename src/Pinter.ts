import {Shape} from "./shape/Shape";
import {ICanvas} from "./ICanvas";

class Painter {
    drawPicture(draft: Array<Shape>, canvas: ICanvas) {
        for (const shape of draft) {
            shape.draw(canvas);
        }
    }
}

export {Painter};