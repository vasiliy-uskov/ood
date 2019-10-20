import {IInputStream} from "./IInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {FileInputStream} from "./FileInputStream";
import {unlinkSync} from "fs"
import {generateDuplicatesBytes, generateUUIDv4} from "./utils";

export class DecompressInputStream implements IInputStream {
	constructor(inputStream: IInputStream, chunkSize: number) {
		if (chunkSize % 2)
		{
			throw new Error('Compress chunk size must be even')
		}
		if (chunkSize < 2)
		{
			throw new Error('Compress chunk size must be greater then 2')
		}
		this._inputStream = this._decompress(inputStream, chunkSize);
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

	private _decompress(inputStream: IInputStream, chunkSize: number): IInputStream {
		const tempOutputStream = new FileOutputStream(this._tempFileName);
		let tempOut: Array<number> = [];
		while (!inputStream.eof()) {
			let tempIn = inputStream.readBuffer(chunkSize);
			for (let i = 0; i < tempIn.length; i += 2) {
				const value = tempIn[i + 1];
				const count = tempIn[i];
				tempOut.push(...generateDuplicatesBytes(value, count));
				if (tempOut.length >= chunkSize) {
					tempOutputStream.writeBuffer(new Buffer(tempOut));
					tempOut = [];
				}
			}
		}
		if (tempOut.length) {
			tempOutputStream.writeBuffer(new Buffer(tempOut));
		}
		tempOutputStream.dispose();
		inputStream.dispose();
		return new FileInputStream(this._tempFileName);
	}

	private _tempFileName = `./${generateUUIDv4()}.temp`;
	private _inputStream: IInputStream;
}