import * as process from "process";
import {IInputStream} from "./IInputStream";
import {FileInputStream} from "./FileInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {simpleTsezarDecrypt, simpleTsezarEncrypt, TranslateInputStream} from "./TranslateInputStream";
import {CompressInputStream} from "./CompressInputStream";
import {DecompressInputStream} from "./DecompressInputStream";

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
		return (stream) => new CompressInputStream(stream);
	}
	if (key == "--decompress") {
		return (stream) => new DecompressInputStream(stream);
	}
	return stream => stream
}

function main(argv: Array<string>): void {
	argv = argv.slice(2); // delete node.exe and scrypt name from arguments array

	const outputStream = new FileOutputStream(argv.pop());
	let inputStream: IInputStream = new FileInputStream(argv.pop());
	while (argv.length) {
		inputStream = getStreamDecoratorByKey(argv.shift(), () => argv.shift())(inputStream);
	}
	const chunkSize = 100;
	while (!inputStream.eof()) {
		outputStream.writeBuffer(inputStream.readBuffer(chunkSize));
	}
	inputStream.dispose();
	outputStream.dispose();
}

main(process.argv);