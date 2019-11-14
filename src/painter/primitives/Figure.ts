import {PrimitivesType} from "./PrimitivesType";
import {Vec2} from "../../utils/Vec2";
import {FigureStyles} from "./FigureStyles";

export type Ellipse = {
	readonly type: PrimitivesType.ELLIPSE;
	readonly figureStyles: FigureStyles
	readonly center: Vec2;
	readonly radiusX: number;
	readonly radiusY: number;
	readonly basis: Vec2;
}

export type Rectangle = {
	readonly type: PrimitivesType.RECTANGLE;
	readonly figureStyles: FigureStyles
	readonly dots: [Vec2, Vec2, Vec2, Vec2];
}

export type Triangle = {
	readonly type: PrimitivesType.TRIANGLE;
	readonly figureStyles: FigureStyles
	readonly vertices: [Vec2, Vec2, Vec2];
}

export type Polygon = {
	readonly type: PrimitivesType.POLYGON;
	readonly figureStyles: FigureStyles
	readonly points: ReadonlyArray<Vec2>;
}

export type Composite = {
	readonly type: PrimitivesType.COMPOSITE;
	readonly items: ReadonlyArray<Figure>;
}

export type Figure = (Composite | Ellipse | Rectangle | Polygon | Triangle);