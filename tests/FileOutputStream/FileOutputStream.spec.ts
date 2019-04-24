import {FileOutputStream} from "../../src/FileOutputStream";
import {expect} from "chai";
import * as path from "path";
import * as fs from "fs";

describe("FileOutputStream", () => {
	it("can write in existent file", () => {
		const outputFile = path.resolve("tests/FileOutputStream/out.bin");
		const stream = new FileOutputStream(outputFile);
		const outBuffer = new Buffer([0x01, 0x02]);
		stream.writeBuffer(outBuffer);
		stream.dispose();
		expect(fs.readFileSync(outputFile)).to.deep.equal(outBuffer)
	});
});