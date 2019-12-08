import {FigureStyles} from "../painter/primitives/FigureStyles";
import {IShape} from "./IShape";
import {Vec2} from "../utils/Vec2";
import {Frame} from "./Frame";
import {Figure} from "../painter/primitives/Figure";
import {PrimitivesType} from "../painter/primitives/PrimitivesType";
import {Transformation} from "../utils/Transformation";
import {transformBasis} from "../utils/utils";

export class EllipseShape implements IShape {
	constructor(shapeStyles: FigureStyles, center: Vec2, basisX: Vec2, basisY: Vec2) {
		this._shapeStyles = shapeStyles;
		this._center = center;
		this._basisX = basisX;
		this._basisY = basisY;
	}

	public static ellipse(shapeStyles: FigureStyles, center: Vec2, radiusX: number, radiusY: number): EllipseShape {
		return new EllipseShape(shapeStyles, center, new Vec2(radiusX, 0), new Vec2(0, radiusY));
	}

	public static circle(shapeStyles: FigureStyles, center: Vec2, radius: number): EllipseShape {
		return this.ellipse(shapeStyles, center, radius, radius);
	}

	setShapeStyles(shapeStyles: FigureStyles): EllipseShape {
		return new EllipseShape(shapeStyles, this._center, this._basisX, this._basisY);
	}

	translate(translateVec: Vec2): EllipseShape {
		return new EllipseShape(
			this._shapeStyles,
			Transformation.translate(translateVec).transform(this._center),
			this._basisX,
			this._basisY
		)
	}

	scale(scaleX: number, scaleY: number = scaleX, origin: Vec2 = this._center): EllipseShape {
		const [center, basisX, basisY] = transformBasis({
			transformation: Transformation.scale(scaleX, scaleY),
			transformOrigin: origin,
			center: this._center,
			basisX: this._basisX,
			basisY: this._basisY,
		});
		return new EllipseShape(this._shapeStyles, center, basisX, basisY);
	}

	rotate(angle: number, origin: Vec2 = this._center): EllipseShape {
		const [center, basisX, basisY] = transformBasis({
			transformation: Transformation.rotate(angle),
			transformOrigin: origin,
			center: this._center,
			basisX: this._basisX,
			basisY: this._basisY,
		});
		return new EllipseShape(this._shapeStyles, center, basisX, basisY);
	}

	figure(): Figure {
		return {
			type: PrimitivesType.ELLIPSE,
			center: this._center,
			basis: this._basisX.normalize(),
			radiusX: this._basisX.toPolar().radius,
			radiusY: this._basisY.toPolar().radius,
			figureStyles: this._shapeStyles,
		};
	}

	frame(): Frame {
		return Frame.createByBasis(
			this._center,
			this._basisX.normalize(),
			this._basisX.toPolar().radius * 2,
			this._basisY.toPolar().radius * 2
		)
	}

	private readonly _center: Vec2;
	private readonly _basisX: Vec2;
	private readonly _basisY: Vec2;
	private readonly _shapeStyles: FigureStyles;
}