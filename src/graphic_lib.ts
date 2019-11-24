export interface ICanvas {
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	setColor(color: number): void;
}

export class Canvas implements ICanvas {
	setColor(color: number): void {
		console.log(`SetColor #${color.toString(16)}`);
	}
	moveTo(x: number, y: number): void {
		console.log(`MoveTo  ${x}, ${y}`);
	}
	lineTo(x: number, y: number): void {
		console.log(`LineTo  ${x}, ${y}`);
	}
}
