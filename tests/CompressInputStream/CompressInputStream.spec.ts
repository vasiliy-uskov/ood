import {CompressInputStream} from "../../src/CompressInputStream";
import {expect} from "chai";
import {MemoryInputStream} from "../../src/MemoryInputStream";
import {generateDuplicatesBytes} from "../../src/utils";

describe("CompressInputStream", () => {
	it("compress without overflowing duplicates bytes count", () => {
		const stream = new CompressInputStream(new MemoryInputStream(new Buffer([
			...generateDuplicatesBytes(0x02, 2),
			...generateDuplicatesBytes(0x03, 4),
			...generateDuplicatesBytes(0x04, 5),
		])), 200);
		expect(stream.readBuffer(3)).to.deep.equal(new Buffer([2, 0x02, 4]));
		expect(stream.readBuffer(1)).to.deep.equal(new Buffer([0x03]));
		expect(stream.readBuffer(5)).to.deep.equal(new Buffer([5, 0x04]));
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	});
	it("compress with overflowing duplicates bytes count", () => {
		const stream = new CompressInputStream(new MemoryInputStream(new Buffer([
			...generateDuplicatesBytes(0x02, 255),
			...generateDuplicatesBytes(0x02, 1),
			...generateDuplicatesBytes(0x03, 255),
		])), 200);
		expect(stream.readBuffer(3)).to.deep.equal(new Buffer([255, 0x02, 1]));
		expect(stream.readBuffer(1)).to.deep.equal(new Buffer([0x02]));
		expect(stream.readBuffer(2)).to.deep.equal(new Buffer([255, 0x03]));
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	});
});