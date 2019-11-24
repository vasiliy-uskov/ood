export type Point = {
	readonly x: number;
	readonly y: number;
};

export type RGBAColor = {
	readonly r: number,
	readonly g: number,
	readonly b: number,
	readonly a: number,
}

export class ModernGraphicsRenderer {
	constructor(printFn: (str: string) => void) {
		this._printFn = printFn;
	}

	beginDraw(): void {
		if (this._drawing)
		{
			throw new Error('Drawing has already begun');
		}
		this._printFn('<draw>');
		this._drawing = true;
	}

	drawLine(start: Point, end: Point, color: RGBAColor): void {
		if (!this._drawing)
		{
			throw new Error("DrawLine is allowed between BeginDraw()/EndDraw() only");
		}
		const colorStr = `\t\t<color r="${color.r}" g="${color.g}" b="${color.b}" a="${color.a}" />`;
		this._printFn(`\t<line fromX="${start.x}" fromY="${start.y}" toX="${end.x}" toY="${end.y}">\n${colorStr}\n\t</line>`)
	}

	endDraw(): void {
		if (!this._drawing)
		{
			throw new Error('Drawing has not been started');
		}
		this._printFn('</draw>');
		this._drawing = false;
	}


	private readonly _printFn: (str: string) => void;
	private _drawing: boolean = false;
}