import {Color} from "./Color";
import {ICanvas} from "./ICanvas";
import {Vec2} from "../utils/Vec2";
import {LineStyle} from "./LineStyle";
import {Transformation} from "../utils/Transformation";

class Path {
	readonly path: string;
	readonly fillColor: string;
	readonly strokeColor: string;
	readonly lineWeight: number;
}

function PathTemplate(path: Path) {
	return `
<path
	fill="${path.fillColor}"
	stroke="${path.strokeColor}"
	stroke-width="${path.lineWeight}"
	d="${path.path}"
/>`
}

function SvgTemplate(width: number, height: number, paths: ReadonlyArray<Path>) {
	return `
<svg width="${width}px" height="${height}px">
	${paths.map(PathTemplate).join('')}
</svg>`
}

class SvgCanvas implements ICanvas {
	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;
	}

	setFillColor(color: (Color | null)) {
		this._addCurrentPathToPicture();
		this._currentFill = color ? color : Color.transparent();
	}

	setLineStyles(lineStyles: LineStyle | null): void {
		this._addCurrentPathToPicture();
		this._currentLineStyle = lineStyles ? lineStyles : LineStyle.none();
	}

	drawLine(from: Vec2, to: Vec2) {
		this._initStartPoint(from);
		this._shape += ` L ${to.x} ${to.y}`;
		this._lastPoint = to;
	}

	drawArc(center: Vec2, radiusX: number, radiusY: number, startAngle: number, angle: number, rotation: number) {
		const drawArc = (startAngle: number, angle: number) => {
			const rotateTransformation = Transformation.rotate(rotation).useTransformOrigin(center);
			const startPoint = rotateTransformation.transform(new Vec2(
				center.x + Math.cos(startAngle) * radiusX,
				center.y + Math.sin(startAngle) * radiusY
			));
			const endPoint = rotateTransformation.transform(new Vec2(
				center.x + Math.cos(startAngle + angle) * radiusX,
				center.y + Math.sin(startAngle + angle) * radiusY
			));
			this._initStartPoint(startPoint);
			this._shape += ` A ${radiusX} ${radiusY} ${(angle + rotation) / Math.PI * 180} 0 1 ${endPoint.x} ${endPoint.y}`;
			this._lastPoint = endPoint;
		};
		const arcCount = Math.floor(angle / Math.PI);
		for (let i = 0; i < arcCount; ++i) {
			drawArc(startAngle + Math.PI * i, Math.PI);
		}
		if (angle - arcCount * Math.PI) {
			drawArc(startAngle + Math.PI * arcCount, angle - arcCount * Math.PI);
		}
	}

	close() {
		this._shape += " Z";
		this._addCurrentPathToPicture();
	}

	getPicture(): string {
		const paths = this._paths.slice();
		const currentPath = this._getCurrentPath();
		currentPath && paths.push(currentPath);
		return SvgTemplate(this._width, this._height, paths)
			.replace(/(\r\n|\n)/g, '')
			.replace(/\t+/g, ' ')
	}

	private _addCurrentPathToPicture() {
		const currentPath = this._getCurrentPath();
		if (currentPath) {
			this._paths.push(currentPath);
			this._shape = "";
			this._lastPoint = null;
		}
	}

	private _getCurrentPath(): (Path | null) {
		if (this._shape) {
			return {
				fillColor: this._currentFill.toRGBA(),
				strokeColor: this._currentLineStyle.lineColor.toRGBA(),
				lineWeight: this._currentLineStyle.lineWeight,
				path: this._shape
			};
		}
		return null
	}

	private _initStartPoint(lastPoint: Vec2) {
		if (!this._lastPoint || lastPoint.x != this._lastPoint.x && lastPoint.y != this._lastPoint.y) {
			this._lastPoint = lastPoint;
			this._shape += ` M ${lastPoint.x} ${lastPoint.y}`;
		}
	}

	private _width: number;
	private _height: number;
	private _paths: Array<Path> = [];
	private _shape: string = "";
	private _currentFill = Color.black();
	private _currentLineStyle = LineStyle.none();
	private _lastPoint: (Vec2 | null) = null;

}

export {SvgCanvas};