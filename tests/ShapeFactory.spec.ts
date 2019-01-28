import {ShapeFactory} from "../src/ShapeFactory";
import {Rectangle} from "../src/shape/Rectangle";
import {Vec2} from "../src/Vec2";
import {Color} from "../src/Color";
import {Triangle} from "../src/shape/Triangle";
import {Polygon} from "../src/shape/Polygon";
import {Ellipse} from "../src/shape/Ellipse";
import {expect} from "Chai";

const shapeFactory = new ShapeFactory();
const invalidShapeTypeError = new Error("Incorrect shape description");
const invalidInputTypeError = new Error("Incorrect input type");

describe("ShapeFactory", () => {
    describe("should throw exception", () => {
        it("when shape type is invalid", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "other shape"
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidShapeTypeError);
            }
        });
        it("when color is invalid", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "rectangle",
                    vertex1: {x: 1, y: 1},
                    vertex2: {x: 2, y: 2}
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidInputTypeError);
            }
        });
        it("when try to create rectangle without vertexes", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "rectangle",
                    color: 10,
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidInputTypeError);
            }
        });
        it("when try to create triangle without vertexes", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "rectangle",
                    color: 10,
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidInputTypeError);
            }
        });
        it("when try to create ellipse with string radius", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "polygon",
                    color: Color.Red,
                    center: {x: 0, y: 1},
                    radiusX: "0",
                    radiusY: "1",
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidInputTypeError);
            }
        });
        it("when try to create ellipse without center", () => {
            try {
                const rectangle = shapeFactory.createShape({
                    type: "polygon",
                    color: Color.Red,
                    radiusX: "0",
                    radiusY: "1",
                });
            }
            catch (e) {
                expect(e).to.deep.equal(invalidInputTypeError);
            }
        });
    });
    describe("should create by correct data", () => {
        it("rectangle", () => {
            const rectangle = shapeFactory.createShape({
                type: "rectangle",
                color: Color.Red,
                vertex1: {x: 1, y: 1},
                vertex2: {x: 2, y: 2}
            });
            expect(rectangle).to.deep.equal(new Rectangle(Color.Red, new Vec2(1, 1), new Vec2(2, 2)));
        });
        it("triangle", () => {
            const triangle = shapeFactory.createShape({
                type: "triangle",
                color: Color.Red,
                vertex1: {x: 0, y: 1},
                vertex2: {x: 1, y: 0},
                vertex3: {x: 0, y: 0}
            });
            expect(triangle).to.deep.equal(new Triangle(Color.Red, new Vec2(0, 1), new Vec2(1, 0), new Vec2(0, 0)));
        });
        it("polygon", () => {
            const polygon = shapeFactory.createShape({
                type: "polygon",
                color: Color.Red,
                vertexes: [{x: 0, y: 1}],
            });
            expect(polygon).to.deep.equal(new Polygon(Color.Red, [new Vec2(0, 1)]));
        });
        it("ellipse", () => {
            const ellipse = shapeFactory.createShape({
                type: "ellipse",
                color: Color.Red,
                center: {x: 0, y: 1},
                radiusX: 0,
                radiusY: 1,
            });
            expect(ellipse).to.deep.equal(new Ellipse(Color.Red, new Vec2(0, 1), 0, 1));
        })
    });
});
