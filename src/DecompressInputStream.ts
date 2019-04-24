import {IInputStream} from "./IInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {FileInputStream} from "./FileInputStream";
import {unlinkSync} from "fs"
import {generateDuplicatesBytes, generateUUIDv4} from "./utils";

export class DecompressInputStream implements IInputStream {
	constructor(inputStream: IInputStream) {
		this._inputStream = this._decompress(inputStream);
	}

	eof(): boolean {
		return this._inputStream.eof();
	}

	readBuffer(bytesCount: number): Buffer {
		return this._inputStream.readBuffer(bytesCount);
	}

	dispose(): void {
		this._inputStream.dispose();
		unlinkSync(this._tempFileName);
	}

	private _decompress(inputStream: IInputStream): IInputStream {
		const tempOutputStream = new FileOutputStream(this._tempFileName);
		while (!inputStream.eof()) {
			const [count, value] = inputStream.readBuffer(2);
			tempOutputStream.writeBuffer(new Buffer(generateDuplicatesBytes(value, count)))
		}
		tempOutputStream.dispose();
		inputStream.dispose();
		return new FileInputStream(this._tempFileName);
	}

	private _tempFileName = `./${generateUUIDv4()}.temp`;
	private _inputStream: IInputStream;
}