import {IInputStream} from "./IInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {FileInputStream} from "./FileInputStream";
import {unlinkSync} from "fs"
import {generateUUIDv4} from "./utils";

export class CompressInputStream implements IInputStream {
	constructor(inputStream: IInputStream, chunkSize: number) {
		if (chunkSize % 2)
		{
			throw new Error('Compress chunk size must be even')
		}
		if (chunkSize < 2)
		{
			throw new Error('Compress chunk size must be greater then 2')
		}
		this._inputStream = this._compress(inputStream, chunkSize);
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

	private _compress(inputStream: IInputStream, chunkSize: number): IInputStream {
		const tempOutputStream = new FileOutputStream(this._tempFileName);
		const maxCountValue = 255;
		const currentByte = {
			count: 0,
			value: -1
		};
		let tempOut: Array<number> = [];
		while (!inputStream.eof()) {
			const inputPart = inputStream.readBuffer(chunkSize);
			for (const valueThatWasRead of inputPart)
			{
				if (valueThatWasRead != currentByte.value || currentByte.count == maxCountValue) {
					if (tempOut.length == chunkSize) {
						tempOutputStream.writeBuffer(new Buffer(tempOut));
						tempOut = [];
					}
					if (currentByte.count > 0) {
						tempOut.push(currentByte.count, currentByte.value)
					}
					currentByte.count = 1;
					currentByte.value = valueThatWasRead;
				}
				else {
					currentByte.count++;
				}
			}
		}
		if (tempOut.length)
		{
			tempOutputStream.writeBuffer(new Buffer(tempOut));
		}
		tempOutputStream.writeBuffer(new Buffer([currentByte.count, currentByte.value]));
		tempOutputStream.dispose();
		inputStream.dispose();
		return new FileInputStream(this._tempFileName);
	}

	private _tempFileName = './' + generateUUIDv4() + '.temp';
	private _inputStream: IInputStream;
}