import {CanvasPainter, Rectangle, Triangle} from "./shape_drawing_lib";
import {Canvas} from "./graphic_lib";
import {ModernGraphicRendererAdapter} from "./ModernGraphicRendererAdapter";
import * as readline from "readline";

function paintPicture(painter: CanvasPainter) {
    const triangle = new Triangle({x: 10, y: 15}, {x: 100, y: 200}, {x: 150, y: 250});
    const rectangle = new Rectangle({x: 30, y: 40}, 18, 24);
    painter.draw(triangle);
    painter.draw(rectangle);
}

function paintPictureOnCanvas(): void {
    const canvas = new Canvas();
    const painter = new CanvasPainter(canvas);
    paintPicture(painter);
}

function paintPictureOnModernGraphicsRenderer(): void {
    const canvas = new ModernGraphicRendererAdapter(console.log);
    const painter = new CanvasPainter(canvas);
    paintPicture(painter);
    canvas.close();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question(`Should we use new API? (y)`, function (answer) {
    if (answer == 'y')
    {
        paintPictureOnModernGraphicsRenderer();
    }
    else
    {
        paintPictureOnCanvas();
    }
    rl.close();
});