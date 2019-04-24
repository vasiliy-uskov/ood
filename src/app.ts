import * as process from "process";
import {IInputStream} from "./IInputStream";
import {FileInputStream} from "./FileInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {simpleTsezarDecrypt, simpleTsezarEncrypt, TranslateInputStream} from "./TranslateInputStream";
import {CompressInputStream} from "./CompressInputStream";
import {DecompressInputStream} from "./DecompressInputStream";


function main(argv: Array<string>): void {
	argv = argv.slice(2);
	const outputStream = new FileOutputStream(argv.pop());
	let inputStream: IInputStream = new FileInputStream(argv.pop());
	while (argv.length) {
		const option = argv.shift();
		if (option == "--encrypt") {
			const key = parseInt(argv.shift());
			if (!isNaN(key)) {
				inputStream = new TranslateInputStream(inputStream, simpleTsezarEncrypt(key));
			}
		}
		if (option == "--decrypt") {
			const key = parseInt(argv.shift());
			if (!isNaN(key)) {
				inputStream = new TranslateInputStream(inputStream, simpleTsezarDecrypt(key));
			}
		}
		if (option == "--compress") {
			inputStream = new CompressInputStream(inputStream);
		}
		if (option == "--decompress") {
			inputStream = new DecompressInputStream(inputStream);
		}
	}
	const chunkSize = 100;
	while (!inputStream.eof()) {
		outputStream.writeBuffer(inputStream.readBuffer(chunkSize));
	}
	inputStream.dispose();
	outputStream.dispose();
}

main(process.argv);