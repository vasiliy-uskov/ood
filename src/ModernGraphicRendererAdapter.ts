import {ICanvas} from "./graphic_lib";
import {ModernGraphicsRenderer, Point} from "./modern_graphic_lib";

export class ModernGraphicRendererAdapter implements ICanvas {
	constructor(printFn: (str: string) => void) {
		this._modernRenderer = new ModernGraphicsRenderer(printFn);
	}

	setColor(color: number): void {
		const red = Math.floor(color / 256 / 256);
		const green = Math.floor((color - red * 256 * 256) / 256);
		const blue = Math.floor((color - red * 256 * 256 - green * 256));
		this._color = {
			r: red / 255,
			g: green / 255,
			b: blue / 255,
			a: 1,
		}
	}

	moveTo(x: number, y: number): void {
		if (this._lastPoint)
		{
			this._modernRenderer.endDraw();
		}
		this._modernRenderer.beginDraw();
		this._lastPoint = {x, y};
	}

	lineTo(x: number, y: number): void {
		if (!this._lastPoint)
		{
			throw new Error('Can not draw line without start point');
		}
		const newPoint = {x, y};
		this._modernRenderer.drawLine(this._lastPoint, newPoint, this._color);
		this._lastPoint = newPoint;
	}

	close(): void {
		if (this._lastPoint)
		{
			this._modernRenderer.endDraw();
			this._lastPoint = null;
		}
	}

	private _color = {r: 0, g: 0, b: 0, a: 0};
	private _lastPoint: Point | null = null;
	private readonly _modernRenderer = new ModernGraphicsRenderer(console.log);
}