import {FigureStyles} from "../painter/primitives/FigureStyles";
import {IEditableShape} from "./IShape";
import {Transformation} from "../utils/Transformation";
import {Vec2} from "../utils/Vec2";
import {Figure} from "../painter/primitives/Figure";
import {PrimitivesType} from "../painter/primitives/PrimitivesType";
import {getDotsByBasis, transformBasis} from "../utils/utils";
import {Frame} from "./Frame";

export class RectangleShape implements IEditableShape {
	constructor(shapeStyles: FigureStyles, leftTop: Vec2, widthBasis: Vec2, heightBasis: Vec2) {
		this._shapeStyles = shapeStyles;
		this._leftTop = leftTop;
		this._widthBasis = widthBasis;
		this._heightBasis = heightBasis;
	}

	public static rectangle(shapeStyles: FigureStyles, leftTop: Vec2, width: number, height: number): RectangleShape {
		return new RectangleShape(shapeStyles, leftTop, new Vec2(width, 0), new Vec2(0, height));
	}

	public static square(shapeStyles: FigureStyles, leftTop: Vec2, sideSize: number): RectangleShape {
		return this.rectangle(shapeStyles, leftTop, sideSize, sideSize)
	}

	setShapeStyles(shapeStyles: FigureStyles): IEditableShape {
		return new RectangleShape(shapeStyles, this._leftTop, this._widthBasis, this._heightBasis);
	}

	translate(translateVec: Vec2): RectangleShape {
		return new RectangleShape(
			this._shapeStyles,
			Transformation.translate(translateVec).transform(this._leftTop),
			this._widthBasis,
			this._heightBasis
		)
	}

	scale(scaleX: number, scaleY: number = scaleX, origin: Vec2 = this.frame().center()): RectangleShape {
		const [center, widthBasis, heightBasis] = transformBasis({
			transformation: Transformation.scale(scaleX, scaleY),
			transformOrigin: origin,
			center: this._leftTop,
			basisX: this._widthBasis,
			basisY: this._heightBasis,
		});
		return new RectangleShape(this._shapeStyles, center, widthBasis, heightBasis);
	}

	rotate(angle: number, origin: Vec2 = this.frame().center()): RectangleShape {
		const [center, widthBasis, heightBasis] = transformBasis({
			transformation: Transformation.rotate(angle),
			transformOrigin: origin,
			center: this._leftTop,
			basisX: this._widthBasis,
			basisY: this._heightBasis,
		});
		return new RectangleShape(this._shapeStyles, center, widthBasis, heightBasis);
	}

	figure(): Figure {
		return {
			type: PrimitivesType.RECTANGLE,
			figureStyles: this._shapeStyles,
			dots: getDotsByBasis(this._leftTop, this._widthBasis, this._heightBasis),
		};
	}

	frame(): Frame {
		return new Frame(this._leftTop, this._widthBasis, this._heightBasis);
	}

	private readonly _leftTop: Vec2;
	private readonly _widthBasis: Vec2;
	private readonly _heightBasis: Vec2;
	private readonly _shapeStyles: FigureStyles;
}