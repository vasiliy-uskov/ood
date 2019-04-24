import {IInputStream} from "./IInputStream";
import {FileOutputStream} from "./FileOutputStream";
import {FileInputStream} from "./FileInputStream";
import {unlinkSync} from "fs"
import {generateUUIDv4} from "./utils";

export class CompressInputStream implements IInputStream {
	constructor(inputStream: IInputStream) {
		this._inputStream = this._compress(inputStream);
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

	private _compress(inputStream: IInputStream): IInputStream {
		const tempOutputStream = new FileOutputStream(this._tempFileName);
		const maxCountValue = 255;
		const currentByte = {
			count: 0,
			value: -1
		};
		while (!inputStream.eof()) {
			const [valueThatWasRead] = inputStream.readBuffer(1);
			if (valueThatWasRead != currentByte.value || currentByte.count == maxCountValue) {
				if (currentByte.count > 0) {
					tempOutputStream.writeBuffer(new Buffer([currentByte.count, currentByte.value]));
				}
				currentByte.count = 1;
				currentByte.value = valueThatWasRead;
			}
			else {
				currentByte.count++;
			}
		}
		tempOutputStream.writeBuffer(new Buffer([currentByte.count, currentByte.value]));
		tempOutputStream.dispose();
		inputStream.dispose();
		return new FileInputStream(this._tempFileName);
	}

	private _tempFileName = './' + generateUUIDv4() + '.temp';
	private _inputStream: IInputStream;
}