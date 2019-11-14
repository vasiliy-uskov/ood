import {Color} from "./Color";

export class LineStyle {
	public readonly lineColor: Color;
	public readonly lineWeight: number;

	public static none(): LineStyle {
		return {
			lineColor: Color.transparent(),
			lineWeight: 0,
		}
	}
}
