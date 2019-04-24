import {MemoryOutputStream} from "../src/MemoryOutputStream";
import {expect} from "chai";

describe("MemoryOutputStream", () => {
	it("can write in existent file", () => {
		const stream = new MemoryOutputStream();
		const outBuffer = new Buffer([0x01, 0x02]);
		stream.writeBuffer(outBuffer);
		stream.dispose();
		expect(stream.buffer()).to.deep.equal(outBuffer)
	});
});