import {Color} from "./Color";
import {Vec2} from "./Vec2";

interface ICanvas {
    setColor(color: Color);

    drawLine(from: Vec2, to: Vec2);

    drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number);

    close();
}

export {ICanvas};