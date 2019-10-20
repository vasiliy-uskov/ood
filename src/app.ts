import * as process from "process";
import {IInputStream} from "./IInputStream";
import {FileInputStream} from "./FileInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {simpleTsezarDecrypt, simpleTsezarEncrypt, TranslateInputStream} from "./TranslateInputStream";
import {CompressInputStream} from "./CompressInputStream";
import {DecompressInputStream} from "./DecompressInputStream";


const CHUNK_SIZE = 100;
const COMPRESS_CHUNK_SIZE = 2 ** 30;

function getStreamDecoratorByKey(key: string, getArgument: () => string): (arg: IInputStream) => IInputStream {
	if (key == "--encrypt") {
		const key = parseInt(getArgument());
		if (!isNaN(key)) {
			return (stream) => new TranslateInputStream(stream, simpleTsezarEncrypt(key));
		}
	}
	if (key == "--decrypt") {
		const key = parseInt(getArgument());
		if (!isNaN(key)) {
			return (stream) => new TranslateInputStream(stream, simpleTsezarDecrypt(key));
		}
	}
	if (key == "--compress") {
		return (stream) => new CompressInputStream(stream, COMPRESS_CHUNK_SIZE);
	}
	if (key == "--decompress") {
		return (stream) => new DecompressInputStream(stream, COMPRESS_CHUNK_SIZE);
	}
	return stream => stream
}

function main(argv: Array<string>): void {
	process.on('exit', () => {
		inputStream.dispose();
		outputStream.dispose();
	});
	argv = argv.slice(2); // delete node.exe and scrypt name from arguments array

	const outputStream = new FileOutputStream(argv.pop());
	let inputStream: IInputStream = new FileInputStream(argv.pop());
	while (argv.length) {
		inputStream = getStreamDecoratorByKey(argv.shift(), () => argv.shift())(inputStream);
	}
	while (!inputStream.eof()) {
		outputStream.writeBuffer(inputStream.readBuffer(CHUNK_SIZE));
	}
}

main(process.argv);