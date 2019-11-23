type ColorProps = {
	r: number,
	g: number,
	b: number,
	a: number,
}

class Color {
	constructor(color: ColorProps) {
		this._color = color;
	}

	toRGBA() {
		return `rgba(${this._color.r.toString(10)}, ${this._color.g.toString(10)}, ${this._color.b.toString(10)}, ${this._color.a.toString(10)})`;
	}

	private readonly _color: ColorProps;

	static black(): Color {
		return new Color({
			r: 0x44,
			g: 0x44,
			b: 0x44,
			a: 1,
		})
	}

	static red(): Color {
		return new Color({
			r: 0xFF,
			g: 0x66,
			b: 0x66,
			a: 1,
		})
	}

	static green(): Color {
		return new Color({
			r: 0xAA,
			g: 0xCC,
			b: 0xAA,
			a: 1,
		})
	}

	static yellow(): Color {
		return new Color({
			r: 0xFF,
			g: 0xFF,
			b: 0x88,
			a: 1,
		})
	}

	static brown(): Color {
		return new Color({
			r: 0x79,
			g: 0x55,
			b: 0x48,
			a: 1,
		})
	}

	static deepBlue(): Color {
		return new Color({
			r: 0x66,
			g: 0x66,
			b: 0xFF,
			a: 1,
		})
	}

	static blue(): Color {
		return new Color({
			r: 0xAA,
			g: 0xAA,
			b: 0xFF,
			a: 1,
		})
	}

	static transparent(): Color {
		return new Color({
			r: 0,
			g: 0,
			b: 0,
			a: 0,
		})
	}
}

export {
	Color,
}
