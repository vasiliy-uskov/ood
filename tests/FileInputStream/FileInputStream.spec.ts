import {FileInputStream} from "../../src/FileInputStream";
import {expect} from "chai";
import * as path from "path";

describe("FileInputStream", () => {
	it("is empty if work with empty file", () => {
		let stream = new FileInputStream(path.resolve("tests/FileInputStream/empty.bin"));
		expect(stream.eof()).to.equal(true);
	});
	it("can read buffer of file", () => {
		let stream = new FileInputStream(path.resolve("tests/FileInputStream/test.bin"));
		expect(stream.readBuffer(2)).to.deep.equal(new Buffer([0x61, 0x62]));
		expect(stream.readBuffer(2)).to.deep.equal(new Buffer([0x63, 0x64]));
		expect(stream.eof()).to.equal(true);
	});
	it("erase returned buffer if in file less bytes then was required in readBuffer method", () => {
		let stream = new FileInputStream(path.resolve("tests/FileInputStream/test.bin"));
		expect(stream.readBuffer(10)).to.deep.equal(new Buffer([0x61, 0x62, 0x63, 0x64]));
		expect(stream.eof()).to.equal(true);
	});
});