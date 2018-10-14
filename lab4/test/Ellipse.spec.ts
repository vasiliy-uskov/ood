import {expect} from "Chai";
import {ShapeFactory} from "../src/ShapeFactory";
import {Ellipse} from "../src/shape/Ellipse";
import {Vec2} from "../src/Vec2";
import {MockCanvas} from "./MockCanvas";
import {Color} from "../src/Color";

describe("Ellipse", () => {
    it("create by color, center, radiusX, radiusY", () => {
        new Ellipse(Color.Red, new Vec2(0, 1), 0, 1);
    });
    it("should draw an ellipse", () => {
        const mockCanvas = new MockCanvas();
        (new Ellipse(Color.Red, new Vec2(0, 1), 0, 1)).draw(mockCanvas);
        const primitives = mockCanvas.primitives();
        expect(primitives.length).equal(1);
        expect(primitives[0]).to.deep.equal({
            type: "arc",
            color: Color.Red,
            center: new Vec2(0, 1),
            radiusX: 0,
            radiusY: 1,
            startAngle: 0,
            angle: Math.PI * 2
        });
    });
});
