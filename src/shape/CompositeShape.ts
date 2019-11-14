import {FigureStyles} from "../painter/primitives/FigureStyles";
import {IEditableShape, IShape} from "./IShape";
import {Vec2} from "../utils/Vec2";
import {isDefAndNotNull} from "../utils/utils";
import {Frame} from "./Frame";
import {PrimitivesType} from "../painter/primitives/PrimitivesType";
import {Figure} from "../painter/primitives/Figure";

export class CompositeShape implements IEditableShape {
	constructor(shapes: Array<IEditableShape>) {
		this._shapes = shapes;
	}

	setShapeStyles(shapeStyles: FigureStyles): IEditableShape {
		return new CompositeShape(this._shapes.map(
			shape => shape.setShapeStyles(shapeStyles)
		));
	}

	scale(scaleX: number, scaleY: number = scaleX, origin?: Vec2): IEditableShape {
		return new CompositeShape(this._shapes.map(
			shape => shape.scale(scaleX, scaleY, this._getOrigin(origin))
		))
	}

	translate(translateVec: Vec2): IEditableShape {
		return new CompositeShape(this._shapes.map(
			shape => shape.translate(translateVec)
		))
	}

	rotate(angle: number, origin?: Vec2): IEditableShape {
		return new CompositeShape(this._shapes.map(
			shape => shape.rotate(angle, this._getOrigin(origin))
		))
	}

	figure(): Figure {
		return {
			type: PrimitivesType.COMPOSITE,
			items: this._shapes.map(shape => shape.figure())
		}
	}

	frame(): (Frame | null) {
		return Frame.createByPoints(
			this._shapes
				.map(shape => shape.frame())
				.filter<Frame>(isDefAndNotNull)
				.reduce<Array<Vec2>>((accumulator, frame) => [...accumulator, ...frame.dots()], [])
		)
	}

	_getOrigin(origin?: Vec2): Vec2 | undefined {
		const frame = this.frame();
		if (!origin && frame)
		{
			return frame.center()
		}
		return origin
	}

	private readonly _shapes: Array<IEditableShape>;
}