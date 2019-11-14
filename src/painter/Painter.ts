import {Ellipse, Figure, Polygon, Rectangle, Triangle} from "./primitives/Figure";
import {ICanvas} from "../canvas/ICanvas";
import {PrimitivesType} from "./primitives/PrimitivesType";
import {FigureStyles} from "./primitives/FigureStyles";

class Painter {
	public static drawFigure(shape: Figure, canvas: ICanvas) {
		switch (shape.type) {
			case PrimitivesType.ELLIPSE:
				this.setShapeStyles(shape.figureStyles, canvas);
				this.drawEllipse(shape, canvas);
				break;
			case PrimitivesType.TRIANGLE:
				this.setShapeStyles(shape.figureStyles, canvas);
				this.drawTriangle(shape, canvas);
				break;
			case PrimitivesType.RECTANGLE:
				this.setShapeStyles(shape.figureStyles, canvas);
				this.drawRectangle(shape, canvas);
				break;
			case PrimitivesType.POLYGON:
				this.setShapeStyles(shape.figureStyles, canvas);
				this.drawPolygon(shape, canvas);
				break;
			case PrimitivesType.COMPOSITE:
				shape.items.forEach(figure => this.drawFigure(figure, canvas));
				break;
		}
	}

	public static setShapeStyles(shapeStyles: FigureStyles, canvas: ICanvas) {
		canvas.setFillColor(shapeStyles.fillColor || null);
		canvas.setLineStyles(shapeStyles.lineStyle || null);
	}

	public static drawTriangle(triangle: Triangle, canvas: ICanvas) {
		const vertices = triangle.vertices;
		canvas.drawLine(vertices[0], vertices[1]);
		canvas.drawLine(vertices[1], vertices[2]);
		canvas.drawLine(vertices[2], vertices[0]);
		canvas.close();
	}

	public static drawRectangle(rectangle: Rectangle, canvas: ICanvas) {
		const [leftTop, rightTop, bottomRight, bottomLeft] = rectangle.dots;
		canvas.drawLine(leftTop, rightTop);
		canvas.drawLine(rightTop, bottomRight);
		canvas.drawLine(bottomRight, bottomLeft);
		canvas.drawLine(bottomLeft, leftTop);
		canvas.close();
	}

	public static drawEllipse(ellipse: Ellipse, canvas: ICanvas) {
		const rotation = ellipse.basis.toPolar().angle;
		canvas.drawArc(ellipse.center, ellipse.radiusX, ellipse.radiusY, 0, Math.PI * 2, rotation);
	}

	public static drawPolygon(polygon: Polygon, canvas: ICanvas) {
		for (let i = 0; i < polygon.points.length; ++i) {
			if (polygon.points.length > 1) {
				canvas.drawLine(polygon.points[i], polygon.points[(i + 1) % polygon.points.length]);
			}
		}
		canvas.close();
	}
}

export {Painter};