import {expect} from "chai";
import {MemoryInputStream} from "../src/MemoryInputStream";
import {TranslateInputStream} from "../src/TranslateInputStream";

describe("DecryptInputStream", () => {
	it("translate all input bytes using decryptor", () => {
		const inputBuffer = new Buffer([0x00, 0x00]);
		const inputStream = new MemoryInputStream(inputBuffer);
		const decryptBuffer = new TranslateInputStream(inputStream, () => 0x01);
		expect(decryptBuffer.readBuffer(inputBuffer.length)).to.deep.equal(new Buffer([0x01, 0x01]));
		expect(decryptBuffer.eof()).to.equal(true);
		decryptBuffer.dispose();
	});
});