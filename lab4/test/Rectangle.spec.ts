import {expect} from "Chai";
import {ShapeFactory} from "../src/ShapeFactory";
import {Vec2} from "../src/Vec2";
import {MockCanvas} from "./MockCanvas";
import {Rectangle} from "../src/shape/Rectangle";
import {Color} from "../src/Color";

describe("Rectangle", () => {
    it("create by color, vertex1, vertex2", () => {
        new Rectangle(Color.Red, new Vec2(0, 0), new Vec2(2, 2));
    });
    it("should draw an polygon", () => {
        const mockCanvas = new MockCanvas();
        (new Rectangle(Color.Red, new Vec2(0, 0), new Vec2(2, 2))).draw(mockCanvas);
        const primitives = mockCanvas.primitives();
        expect(primitives.length).equal(5);
        expect(primitives).to.deep.equal([
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(0, 0),
                to: new Vec2(2, 0)
            },
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(2, 0),
                to: new Vec2(2, 2)
            },
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(2, 2),
                to: new Vec2(0, 2)
            },
            {
                type: "line",
                color: Color.Red,
                from: new Vec2(0, 2),
                to: new Vec2(0, 0)
            },
            {
                type: "close"
            }
        ]);
    });
});