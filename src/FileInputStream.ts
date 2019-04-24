import {IInputStream} from "./IInputStream";
import {fstatSync, readSync} from "fs";
import {FileStream} from "./FileStream";


export class FileInputStream extends FileStream implements IInputStream {
	constructor(fileName: string) {
		super(fileName, "r");
		this._fileSize = fstatSync(this._fd).size;

	}

	eof(): boolean {
		return this._position >= this._fileSize;
	}

	readBuffer(bytesCount: number): Buffer {
		const buffer = this._readBuffer(bytesCount, this._position);
		this._position += buffer.length;
		return buffer
	}

	private _readBuffer(bytesCount: number, position: number): Buffer {
		const buffer = new Buffer(bytesCount);
		const bytesRead = readSync(this._fd, buffer, 0, bytesCount, position);
		return buffer.slice(0, bytesRead)
	}

	private _fileSize: number;
	private _position = 0;
}