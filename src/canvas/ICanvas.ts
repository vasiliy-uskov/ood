import {Color} from "./Color";
import {Vec2} from "../utils/Vec2";
import {LineStyle} from "./LineStyle";

interface ICanvas {
	setFillColor(color: (Color | null)): void;

	setLineStyles(lineStyles: (LineStyle | null)): void;

	drawLine(from: Vec2, to: Vec2): void;

	drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number, rotation: number): void;

	close(): void;
}

export {ICanvas};