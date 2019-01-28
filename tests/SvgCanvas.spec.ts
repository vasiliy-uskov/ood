import {expect} from "Chai";
import {SvgCanvas} from "../src/SvgCanvas";
import {Color} from "../src/Color";
import {Vec2} from "../src/Vec2";

let canvas;

describe("SvgCanvas", () => {
    beforeEach(() => {canvas = new SvgCanvas(100, 100)});
    it("construct by width and height", () => {
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"></svg>`);
    });
    it("default color is black", () => {
        canvas.close();
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" Z"></path></svg>`);
    });
    it("close method open new shape", () => {
        canvas.close();
        canvas.close();
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" Z"></path><path fill="#444" d=" Z"></path></svg>`);
    });
    it("setColor method close current shape and change color", () => {
        canvas.close();
        canvas.setColor(Color.Green);
        canvas.close();
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" Z"></path><path fill="#ACA" d=" Z"></path></svg>`);
    });
    it("drawLine method add L and M (if last cord is unset) parameter to current path", () => {
        canvas.drawLine(new Vec2(0, 0), new Vec2(1, 1));
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 0 0 L 1 1"></path></svg>`);
    });
    it("drawLine method add L and M (if last cord is does not match with last cord) parameter to current path", () => {
        canvas.drawLine(new Vec2(0, 0), new Vec2(1, 1));
        canvas.drawLine(new Vec2(0, 0), new Vec2(1, 1));
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 0 0 L 1 1 M 0 0 L 1 1"></path></svg>`);
    });
    it("drawLine method add only L (if last cord is match with last cord) parameter to current path", () => {
        canvas.drawLine(new Vec2(0, 0), new Vec2(1, 1));
        canvas.drawLine(new Vec2(1, 1), new Vec2(2, 2));
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 0 0 L 1 1 L 2 2"></path></svg>`);
    });
    it("drawArc method add A and M (if last cord is unset) parameter to current path", () => {
        canvas.drawArc(new Vec2(1, 1), 1, 1, 0, Math.PI);
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 2 1 A 1 1 180 0 1 0 1.0000000000000002"></path></svg>`);
    });
    it("drawArc method add two A and M (if last cord is unset and angle more then PI) parameter to current path", () => {
        canvas.drawArc(new Vec2(1, 1), 1, 1, 0, Math.PI * 2);
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 2 1 A 1 1 180 0 1 0 1.0000000000000002 A 1 1 180 0 1 2 0.9999999999999998"></path></svg>`);
    });
    it("drawArc method add A and M (if last cord is match with last cord) parameter to current path", () => {
        canvas.drawLine(new Vec2(0, 1), new Vec2(2, 1));
        canvas.drawArc(new Vec2(1, 1), 1, 1, 0, Math.PI);
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 0 1 L 2 1 A 1 1 180 0 1 0 1.0000000000000002"></path></svg>`);
    });
    it("drawArc method add two A and M (if last cord is match with last cord and angle more then PI) parameter to current path", () => {
        canvas.drawLine(new Vec2(0, 1), new Vec2(2, 1));
        canvas.drawArc(new Vec2(1, 1), 1, 1, 0, Math.PI * 2);
        expect(canvas.getPicture()).equal(`<svg width="100px" height="100px"><path fill="#444" d=" M 0 1 L 2 1 A 1 1 180 0 1 0 1.0000000000000002 A 1 1 180 0 1 2 0.9999999999999998"></path></svg>`);
    });
});
