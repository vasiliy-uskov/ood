import {writeSync} from "fs";
import {FileStream} from "./FileStream";
import {IOutputStream} from "./IOutputStream";

export class FileOutputStream extends FileStream implements IOutputStream {
	constructor(fileName: string) {
		super(fileName, "w");
	}

	writeBuffer(buffer: Buffer): void {
		const writtenBytesCount = writeSync(this._fd, buffer, 0, buffer.length, this._position);
		if (writtenBytesCount < buffer.length)
		{
			console.warn("Not all bytes was written");
		}
		this._position += buffer.length;
	}

	private _position = 0;
}