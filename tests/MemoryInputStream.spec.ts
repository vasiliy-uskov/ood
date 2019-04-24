import {expect} from "chai";
import {MemoryInputStream} from "../src/MemoryInputStream";

describe("FileInputStream", () => {
	it("is empty if work with empty buffer", () => {
		let stream = new MemoryInputStream(new Buffer([]));
		expect(stream.eof()).to.equal(true);
	});
	it("can read buffer of file", () => {
		let stream = new MemoryInputStream(new Buffer([1, 2, 3, 4, 5]));
		expect(stream.readBuffer(2)).to.deep.equal(new Buffer([1, 2]));
		expect(stream.readBuffer(3)).to.deep.equal(new Buffer([3, 4, 5]));
		expect(stream.eof()).to.equal(true);
		stream.dispose();
	});
	it("erase returned buffer if in file less bytes then was required in readBuffer method", () => {
		let stream = new MemoryInputStream(new Buffer([1, 2, 3, 4]));
		expect(stream.readBuffer(10)).to.deep.equal(new Buffer([1, 2, 3, 4]));
		expect(stream.eof()).to.equal(true);
		stream.dispose();
	});
});