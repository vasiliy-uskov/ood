import {FigureStyles} from "../painter/primitives/FigureStyles";
import {Figure} from "../painter/primitives/Figure";
import {Vec2} from "../utils/Vec2";
import {Frame} from "./Frame";

export interface IShape {
	figure(): Figure,
	frame(): (Frame | null);
	setShapeStyles(shapeStyles: FigureStyles): IShape;
	scale(scaleX: number, scaleY?: number, origin?: Vec2): IShape;
	translate(translateVec: Vec2): IShape;
	rotate(angle: number, rotateCenter?: Vec2): IShape;
}