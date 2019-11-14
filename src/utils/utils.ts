import {Vec2} from "./Vec2";
import {Transformation} from "./Transformation";

export function isDefAndNotNull<T>(x: T | null | undefined): x is T {
	return x !== null && x !== undefined;
}

export function getDotsByBasis(leftTop: Vec2, widthBasis: Vec2, heightBasis: Vec2): [Vec2, Vec2, Vec2, Vec2] {
	return [
		leftTop,
		Vec2.sum(leftTop, widthBasis),
		Vec2.sum(leftTop, widthBasis, heightBasis),
		Vec2.sum(leftTop, heightBasis),
	]
}

type transformBasisProps = Readonly<{
	transformation: Transformation
	transformOrigin: Vec2,
	center: Vec2,
	basisX: Vec2,
	basisY: Vec2
}>

export function transformBasis({transformation, transformOrigin, center, basisX, basisY}: transformBasisProps): [Vec2, Vec2, Vec2] {
	const transformationWithOrigin = transformation.useTransformOrigin(transformOrigin);
	const newCenter = transformationWithOrigin.transform(center);
	const newBasisX = Vec2.diff(transformationWithOrigin.transform(Vec2.sum(basisX, center)), newCenter);
	const newBasisY = Vec2.diff(transformationWithOrigin.transform(Vec2.sum(basisY, center)), newCenter);
	return [newCenter, newBasisX, newBasisY];
}