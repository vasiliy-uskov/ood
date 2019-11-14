import {Vec2} from "../utils/Vec2";
import {Transformation} from "../utils/Transformation";
import {getDotsByBasis} from "../utils/utils";

export class Frame {
	constructor(leftTop: Vec2, widthBasis: Vec2, heightBasis: Vec2) {
		this._leftTop = leftTop;
		this._widthBasis = widthBasis;
		this._heightBasis = heightBasis;
	}

	public static createByBasis(center: Vec2, basis: Vec2, width: number, height: number): Frame {
		const halfHeightBasis = Vec2.scale(Transformation.rotate(Math.PI / 2).transform(basis), height / 2);
		const halfWidthBasis = Vec2.scale(basis, width / 2);
		const leftTop = Vec2.sum(center, halfHeightBasis.reverse(), halfWidthBasis.reverse());
		return new Frame(leftTop, Vec2.scale(halfWidthBasis, 2), Vec2.scale(halfHeightBasis, 2));
	}

	public static createByPoints(points: ReadonlyArray<Vec2>): Frame | null {
		if (!points.length) {
			return null;
		}
		let leftTop = points[0];
		let rightBottom = points[0];
		for (const dot of points) {
			if (leftTop.x > dot.x) {
				leftTop = new Vec2(dot.x, leftTop.y);
			}
			if (leftTop.y > dot.y) {
				leftTop = new Vec2(leftTop.x, dot.y);
			}
			if (rightBottom.x < dot.x) {
				rightBottom = new Vec2(dot.x, rightBottom.y);
			}
			if (rightBottom.y < dot.y) {
				leftTop = new Vec2(rightBottom.x, dot.y);
			}
		}
		const rightBottomBasis = Vec2.diff(rightBottom, leftTop);
		return new Frame(leftTop, new Vec2(rightBottomBasis.x, 0), new Vec2(0, rightBottomBasis.y));
	}

	center(): Vec2 {
		if (!this._center)
		{
			const diagonal = Vec2.sum(this._widthBasis, this._heightBasis);
			const notShiftedCenter = Vec2.scale(diagonal, 1 / 2);
			this._center = Vec2.sum(this._leftTop, notShiftedCenter);
		}
		return this._center;
	}

	dots(): [Vec2, Vec2, Vec2, Vec2] {
		if (!this._dots)
		{
			this._dots = getDotsByBasis(this._leftTop, this._widthBasis, this._heightBasis);
		}
		return this._dots;
	}

	private _center: Vec2 | null = null;
	private _dots: [Vec2, Vec2, Vec2, Vec2] | null = null;
	private readonly _leftTop: Vec2;
	private readonly _widthBasis: Vec2;
	private readonly _heightBasis: Vec2;
}