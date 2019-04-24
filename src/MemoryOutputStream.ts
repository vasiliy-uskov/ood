import {IOutputStream} from "./IOutputStream";

export class MemoryOutputStream implements IOutputStream {
	writeBuffer(buffer: Buffer): void {
		this._buffer = new Buffer([...this._buffer, ...buffer])
	}

	buffer(): Buffer {
		return this._buffer.slice();
	}

	dispose(): void {}

	private _buffer =  new Buffer([]);
}