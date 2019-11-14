import {Vec2} from "./Vec2";

type TransformConfig = {
	_00: number, _01: number, _02: number,
	_10: number, _11: number, _12: number,
}

class Transformation {
	constructor(config: TransformConfig) {
		this._points = config;
	}

	public add(tansform: Transformation): Transformation {
		const points1 = Object.assign(tansform._points);
		const points2 = Object.assign(this._points);
		points1._00 = points1._00 * points2._00 + points1._01 * points2._10;
		points1._01 = points1._00 * points2._01 + points1._01 * points2._11;
		points1._10 = points1._10 * points2._00 + points1._11 * points2._10;
		points1._11 = points1._10 * points2._01 + points1._11 * points2._11;
		points1._02 = points1._00 * points2._02 + points1._01 * points2._12 + points1._02;
		points1._12 = points1._10 * points2._02 + points1._11 * points2._12 + points1._12;
		this._points = points1;
		return this;
	}

	public rotate(angle: number): Transformation {
		return this.add(Transformation.rotate(angle));
	}

	public scale(scaleX: number, scaleY: number): Transformation {
		return this.add(Transformation.scale(scaleX, scaleY));
	}

	public translate(vec: Vec2): Transformation {
		return this.add(Transformation.translate(vec));
	}

	public useTransformOrigin(origin: Vec2): Transformation {
		return Transformation
			.translate(origin.reverse())
			.add(this)
			.translate(origin);
	}

	public transform(vec: Vec2): Vec2 {
		const x = vec.x * this._points._00 + vec.y * this._points._01 + this._points._02;
		const y = vec.x * this._points._10 + vec.y * this._points._11 + this._points._12;
		return new Vec2(x, y);
	}

	public static rotate(angle: number): Transformation {
		return new Transformation({
			_00: Math.cos(-angle), _01: Math.sin(-angle), _02: 0,
			_10: -Math.sin(-angle), _11: Math.cos(-angle), _12: 0,
		})
	}

	public static scale(scaleX: number, scaleY: number = scaleX): Transformation {
		return new Transformation({
			_00: scaleX, _01: 0, _02: 0,
			_10: 0, _11: scaleY, _12: 0,
		})
	}

	public static translate(vec: Vec2): Transformation {
		return new Transformation({
			_00: 1, _01: 0, _02: vec.x,
			_10: 0, _11: 1, _12: vec.y,
		})
	}

	public static empty(): Transformation {
		return new Transformation({
			_00: 1, _01: 0, _02: 0,
			_10: 0, _11: 1, _12: 0,
		})
	}

	private _points: TransformConfig;
}

export {Transformation};