import {ICanvas} from "./graphic_lib";

export interface IDrawable {
	draw(canvas: ICanvas): void;
}

export type Point = {
	readonly x: number,
	readonly y: number,
}

export class CanvasPainter {
	constructor(canvas: ICanvas) {
		this._canvas = canvas;
	}

	draw(drawable: IDrawable): void {
		drawable.draw(this._canvas);
	}

	private readonly _canvas: ICanvas;
}

export class Rectangle implements IDrawable {
	constructor(leftTop: Point, height: number, width: number, color: number = 0x0) {
		this._leftTop = leftTop;
		this._width = width;
		this._height = height;
		this._color = color;
	}

	draw(canvas: ICanvas) {
		canvas.setColor(this._color);
		canvas.moveTo(this._leftTop.x, this._leftTop.y);
		canvas.lineTo(this._leftTop.x + this._width, this._leftTop.y);
		canvas.lineTo(this._leftTop.x + this._width, this._leftTop.y + this._height);
		canvas.lineTo(this._leftTop.x, this._leftTop.y + this._height);
		canvas.lineTo(this._leftTop.x, this._leftTop.y);
	}

	private readonly _leftTop: Point;
	private readonly _width: number;
	private readonly _height: number;
	private readonly _color: number;
}

export class Triangle implements IDrawable {
	constructor(p1: Point, p2: Point, p3: Point, color: number = 0x0) {
		this._p1 = p1;
		this._p2 = p2;
		this._p3 = p3;
		this._color = color;
	}

	draw(canvas: ICanvas) {
		canvas.setColor(this._color);
		canvas.moveTo(this._p1.x, this._p1.y);
		canvas.lineTo(this._p2.x, this._p2.y);
		canvas.lineTo(this._p3.x, this._p3.y);
		canvas.lineTo(this._p1.x, this._p1.y);
	}

	private readonly _p1: Point;
	private readonly _p2: Point;
	private readonly _p3: Point;
	private readonly _color: number;
}
