import {FigureStyles} from "../painter/primitives/FigureStyles";
import {IShape} from "./IShape";
import {Transformation} from "../utils/Transformation";
import {Vec2} from "../utils/Vec2";
import {Figure} from "../painter/primitives/Figure";
import {PrimitivesType} from "../painter/primitives/PrimitivesType";
import {Frame} from "./Frame";

export class TriangleShape implements IShape {
	constructor(shapeStyles: FigureStyles, vertices: [Vec2, Vec2, Vec2]) {
		this._shapeStyles = shapeStyles;
		this._vertices = vertices;
	}

	setShapeStyles(shapeStyles: FigureStyles): IShape {
		return new TriangleShape(shapeStyles, this._vertices);
	}

	translate(translateVec: Vec2): TriangleShape {
		const transform = Transformation.translate(translateVec);
		return new TriangleShape(
			this._shapeStyles,
			[
				transform.transform(this._vertices[0]),
				transform.transform(this._vertices[1]),
				transform.transform(this._vertices[2]),
			]
		)
	}

	scale(scaleX: number, scaleY: number = scaleX, origin: Vec2 = this.frame().center()): TriangleShape {
		const transform = Transformation.scale(scaleX, scaleY).useTransformOrigin(origin);
		return new TriangleShape(
			this._shapeStyles,
			[
				transform.transform(this._vertices[0]),
				transform.transform(this._vertices[1]),
				transform.transform(this._vertices[2]),
			]
		);
	}

	rotate(angle: number, origin: Vec2 = this.frame().center()): TriangleShape {
		const transform = Transformation.rotate(angle).useTransformOrigin(origin);
		return new TriangleShape(
			this._shapeStyles,
			[
				transform.transform(this._vertices[0]),
				transform.transform(this._vertices[1]),
				transform.transform(this._vertices[2]),
			]
		);
	}

	figure(): Figure {
		return {
			type: PrimitivesType.TRIANGLE,
			figureStyles: this._shapeStyles,
			vertices: this._vertices,
		};
	}

	frame(): Frame {
		const frame = Frame.createByPoints(this._vertices);
		if (!frame)
		{
			throw new Error('Unexpected vertices count');
		}
		return frame
	}

	private readonly _shapeStyles: FigureStyles;
	private readonly _vertices: [Vec2, Vec2, Vec2];
}