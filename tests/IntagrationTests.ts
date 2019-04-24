import {DecompressInputStream} from "../src/DecompressInputStream";
import {CompressInputStream} from "../src/CompressInputStream";
import {MemoryInputStream} from "../src/MemoryInputStream";
import {expect} from "chai";
import {simpleTsezarDecrypt, simpleTsezarEncrypt, TranslateInputStream} from "../src/TranslateInputStream";
import {IInputStream} from "../src/IInputStream";

describe('integration', () => {
	it('decompress in same buffer', () => {
		const buffer = new Buffer("This text will be decompressed: abcd");
		const stream = new DecompressInputStream(
			new CompressInputStream(
				new MemoryInputStream(
					buffer
				)
			)
		);
		expect(stream.readBuffer(buffer.length)).to.deep.equal(buffer);
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	});

	it('translate in the same buffer', () => {
		const arr = new Array<number>();
		for (let i = 0; i < 256; ++i){
			arr.push(i);
		}
		const buffer = new Buffer(arr);
		let stream: IInputStream = new MemoryInputStream(buffer);
		stream = new TranslateInputStream(stream, simpleTsezarEncrypt(3));
		stream = new TranslateInputStream(stream, simpleTsezarEncrypt(100500));
		stream = new CompressInputStream(stream);
		stream = new DecompressInputStream(stream);
		stream = new TranslateInputStream(stream, simpleTsezarDecrypt(100500));
		stream = new TranslateInputStream(stream, simpleTsezarDecrypt(3));
		expect(stream.readBuffer(buffer.length)).to.deep.equal(buffer);
		expect(stream.eof()).to.deep.equal(true);
		stream.dispose()
	})
});