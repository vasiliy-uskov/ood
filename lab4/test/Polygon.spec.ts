import {expect} from "Chai";
import {ShapeFactory} from "../src/ShapeFactory";
import {Vec2} from "../src/Vec2";
import {MockCanvas} from "./MockCanvas";
import {Polygon} from "../src/shape/Polygon";
import {Color} from "../src/Color";

describe("Polygon", () => {
    it("create by color, vertexes", () => {
        new Polygon(Color.Red, [new Vec2(0, 1), new Vec2(1, 9), new Vec2(9, 1)]);
    });
    it("should draw an polygon", () => {
        const mockCanvas = new MockCanvas();
        (new Polygon(Color.Red, [new Vec2(0, 1), new Vec2(1, 9), new Vec2(9, 1)])).draw(mockCanvas);
        const primitives = mockCanvas.primitives();
        expect(primitives.length).equal(4);
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
            },
            {
                type: "close"
            }
        ]);
    });
});