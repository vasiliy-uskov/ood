class Vec2 {
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public static sum(...vectors: Array<Vec2>): Vec2 {
		return new Vec2(
			vectors.reduce((x, vec) => x + vec.x, 0),
			vectors.reduce((y, vec) => y + vec.y, 0)
		)
	}

	public static diff(a: Vec2, b: Vec2): Vec2 {
		return new Vec2(a.x - b.x, a.y - b.y)
	}

	public static scale(vec: Vec2, num: number): Vec2 {
		return new Vec2(vec.x * num, vec.y * num);
	}

	public static scalarComposite(a: Vec2, b: Vec2): number {
		return a.x * b.x + a.y * b.y
	}

	public normalize(): Vec2 {
		return (new PolarVec2(1, this.toPolar().angle)).toDescartes();
	}

	public reverse(): Vec2 {
		return Vec2.scale(this, -1);
	}

	public toPolar(): PolarVec2 {
		if (!this._polarVec2)
		{
			const radius = Math.sqrt(this.x * this.x + this.y * this.y);
			const polarBasis = new Vec2(1, 0);
			const cos = Vec2.scalarComposite(this, polarBasis) / radius;
			const angle = Math.sign(this.y) * Math.acos(cos);
			this._polarVec2 = new PolarVec2(radius, angle);
		}
		return this._polarVec2;
	}

	public readonly x: number;
	public readonly y: number;

	private _polarVec2: PolarVec2 | null = null;
}

class PolarVec2 {
	constructor(radius: number, angle: number) {
		this.radius = radius;
		this.angle = angle;
	}

	public toDescartes(): Vec2 {
		if (!this._descartes)
		{
			this._descartes = new Vec2(
				this.radius * Math.cos(this.angle),
				this.radius * Math.sin(this.angle)
			);
		}
		return this._descartes;
	}

	public readonly angle: number;
	public readonly radius: number;

	private _descartes: Vec2 | null = null;
}

export {
	Vec2,
};