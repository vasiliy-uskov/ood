import {expect} from "chai";
import {MemoryInputStream} from "../../src/MemoryInputStream";
import {generateDuplicatesBytes} from "../../src/utils";
import {DecompressInputStream} from "../../src/DecompressInputStream";

describe("DecompressInputStream", () => {
	it("decompress without overflowing duplicates bytes count", () => {
		const stream = new DecompressInputStream(new MemoryInputStream(new Buffer([2, 0x02, 4, 0x03, 5, 0x04])));
		expect(stream.readBuffer(2)).to.deep.equal(new Buffer([...generateDuplicatesBytes(0x02, 2)]));
		expect(stream.readBuffer(4)).to.deep.equal(new Buffer([...generateDuplicatesBytes(0x03, 4)]));
		expect(stream.readBuffer(5)).to.deep.equal(new Buffer([...generateDuplicatesBytes(0x04, 5)]));
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	});
	it("decompress with overflowing duplicates bytes count", () => {
		const stream = new DecompressInputStream(new MemoryInputStream(new Buffer([255, 0x02, 1, 0x02, 255, 0x03])));
		expect(stream.readBuffer(256)).to.deep.equal(new Buffer([...generateDuplicatesBytes(0x02, 256)]));
		expect(stream.readBuffer(255)).to.deep.equal(new Buffer([...generateDuplicatesBytes(0x03, 255)]));
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	});
});