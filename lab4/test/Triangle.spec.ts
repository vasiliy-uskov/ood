import {expect} from "Chai";
import {ShapeFactory} from "../src/ShapeFactory";
import {Vec2} from "../src/Vec2";
import {MockCanvas} from "./MockCanvas";
import {Triangle} from "../src/shape/Triangle";
import {Color} from "../src/Color";

describe("Triangle", () => {
    it("create by color, vertex1, vertex2, vertex3", () => {
        new Triangle(Color.Red, new Vec2(0, 1), new Vec2(1, 9), new Vec2(9, 1));
    });
    it("should draw an polygon", () => {
        const mockCanvas = new MockCanvas();
        (new Triangle(Color.Red, new Vec2(0, 1), new Vec2(1, 9), new Vec2(9, 1))).draw(mockCanvas);
        const primitives = mockCanvas.primitives();
        expect(primitives.length).equal(3);
        expect(primitives).to.deep.equal([
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(0, 1),
                to: new Vec2(1, 9)
            },
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(1, 9),
                to: new Vec2(9, 1)
            },
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(9, 1),
                to: new Vec2(0, 1)
            }
        ]);
    });
});