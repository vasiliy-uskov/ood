import {FigureStyles} from "../painter/primitives/FigureStyles";
import {Figure} from "../painter/primitives/Figure";
import {Vec2} from "../utils/Vec2";
import {Frame} from "./Frame";

export interface IShape {
	figure(): Figure,
	frame(): (Frame | null);
}

export interface IEditableShape extends IShape {
	setShapeStyles(shapeStyles: FigureStyles): IEditableShape;
	scale(scaleX: number, scaleY?: number, origin?: Vec2): IEditableShape;
	translate(translateVec: Vec2): IEditableShape;
	rotate(angle: number, rotateCenter?: Vec2): IEditableShape;
}