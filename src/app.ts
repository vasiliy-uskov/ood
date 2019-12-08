import {SvgCanvas} from "./canvas/SvgCanvas";
import {Painter} from "./painter/Painter";
import {IShape} from "./shape/IShape";
import {EllipseShape} from "./shape/EllipseShape";
import {Color} from "./canvas/Color";
import {Vec2} from "./utils/Vec2";
import {CompositeShape} from "./shape/CompositeShape";
import {RectangleShape} from "./shape/RectangleShape";
import {TriangleShape} from "./shape/TriangleShape";

function createSun(centerPosition: Vec2, size: number): IShape {
	const shapeStyle = {
		fillColor: Color.yellow(),
	};
	return EllipseShape.circle(shapeStyle, centerPosition, size / 2)
}

function createHouse(leftTopPosition: Vec2, width: number, height: number): IShape {
	const bodyShapeStyle = {
		fillColor: Color.black(),
	};
	const roofShapeStyle = {
		fillColor: Color.red(),
	};
	const windowShapeStyle = {
		fillColor: Color.blue(),
		lineStyle: {
			lineColor: Color.brown(),
			lineWeight: 4,
		},
	};
	const roofHeight = height * 2 / 5;
	const bodyOffset = width * 1 / 6;

	const bodyWidth = width - bodyOffset * 2;
	const bodyHeight = height - roofHeight;
	const bodyPosition = new Vec2(bodyOffset, roofHeight);

	const windowOffsetX = bodyOffset * 2;
	const windowOffsetY = bodyOffset + roofHeight;
	const windowPosition = new Vec2(windowOffsetX, windowOffsetY);
	const windowWidth = width - windowOffsetX * 2;
	const windowHeight = bodyHeight - bodyOffset * 2;

	const house = new CompositeShape([
		RectangleShape.rectangle(bodyShapeStyle, bodyPosition, bodyWidth, bodyHeight),
		new TriangleShape(roofShapeStyle, [
			new Vec2(0, roofHeight),
			new Vec2(width / 2, 0),
			new Vec2(width, roofHeight),
		]),
		RectangleShape.rectangle(windowShapeStyle, windowPosition, windowWidth, windowHeight),
		RectangleShape.rectangle(windowShapeStyle, windowPosition, windowWidth, windowHeight / 3),
		RectangleShape.rectangle(windowShapeStyle, windowPosition, windowWidth / 2, windowHeight / 3),
	]);
	return house.translate(leftTopPosition);
}

const canvasWidth = 200;
const canvasHeight = 200;
const canvas = new SvgCanvas(canvasWidth, canvasHeight);
const slide = new CompositeShape([
	RectangleShape.rectangle({fillColor: Color.deepBlue()}, new Vec2(0, 0), canvasWidth, canvasHeight),
	createHouse(new Vec2(40, canvasHeight - 120), 100, 120),
	createSun(new Vec2(170, 30), 20),
]);
Painter.drawFigure(slide.rotate(Math.PI / 4).scale(0.5).figure(), canvas);
console.log(canvas.getPicture());