import {IInputStream} from "./IInputStream";

export class MemoryInputStream implements IInputStream {
	constructor(buffer: Buffer) {
		this._buffer = new Buffer(buffer.length);
		buffer.copy(this._buffer, 0, 0, buffer.length);
	}

	eof(): boolean {
		return this._position >= this._buffer.length;
	}

	readBuffer(bytesCount: number): Buffer {
		const buffer = new Buffer(bytesCount);
		const copyCount = this._buffer.copy(buffer, 0, this._position, this._position + bytesCount);
		this._position += bytesCount;
		return buffer.slice(0, copyCount);
	}

	dispose(): void {}

	private _position = 0;
	private _buffer: Buffer;
}