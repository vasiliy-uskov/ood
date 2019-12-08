import {FigureStyles} from "../painter/primitives/FigureStyles";
import {IShape} from "./IShape";
import {Transformation} from "../utils/Transformation";
import {Vec2} from "../utils/Vec2";
import {Figure} from "../painter/primitives/Figure";
import {PrimitivesType} from "../painter/primitives/PrimitivesType";
import {Frame} from "./Frame";

export class PolygonShape implements IShape {
	constructor(shapeStyles: FigureStyles, points: ReadonlyArray<Vec2>) {
		this._shapeStyles = shapeStyles;
		this._points = points;
	}

	setShapeStyles(shapeStyles: FigureStyles): IShape {
		return new PolygonShape(shapeStyles, this._points);
	}

	add(point: Vec2): PolygonShape {
		return new PolygonShape(this._shapeStyles, [...this._points, point]);
	}

	translate(translateVec: Vec2): PolygonShape {
		const transform = Transformation.translate(translateVec);
		return new PolygonShape(
			this._shapeStyles,
			[
				transform.transform(this._points[0]),
				transform.transform(this._points[1]),
				transform.transform(this._points[2]),
			]
		)
	}

	scale(scaleX: number, scaleY: number = scaleX, origin: Vec2 = this.frame().center()): PolygonShape {
		const transform = Transformation.scale(scaleX, scaleY).useTransformOrigin(origin);
		return new PolygonShape(
			this._shapeStyles,
			[
				transform.transform(this._points[0]),
				transform.transform(this._points[1]),
				transform.transform(this._points[2]),
			]
		);
	}

	rotate(angle: number, origin: Vec2 = this.frame().center()): PolygonShape {
		const transform = Transformation.rotate(angle).useTransformOrigin(origin);
		return new PolygonShape(
			this._shapeStyles,
			this._points.map(point => transform.transform(point))
		);
	}

	figure(): Figure {
		return {
			type: PrimitivesType.POLYGON,
			figureStyles: this._shapeStyles,
			points: this._points,
		};
	}

	frame(): Frame {
		const frame = Frame.createByPoints(this._points);
		if (!frame)
		{
			throw new Error('Unexpected points count');
		}
		return frame
	}

	private readonly _shapeStyles: FigureStyles;
	private readonly _points: ReadonlyArray<Vec2>;
}