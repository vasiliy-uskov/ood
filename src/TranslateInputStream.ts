import {IInputStream} from "./IInputStream";

type Translator = (num: number) => number

export class TranslateInputStream implements IInputStream {
	constructor(inputStream: IInputStream, decryptor: Translator) {
		this._inputStream = inputStream;
		this._decryptor = decryptor;
	}

	eof(): boolean {
		return this._inputStream.eof();
	}

	readBuffer(bytesCount: number): Buffer {
		const buffer = this._inputStream.readBuffer(bytesCount);
		for (let i = 0; i < buffer.length; ++i) {
			buffer[i] = this._decryptor(buffer[i]);
		}
		return buffer;
	}

	dispose(): void {
		this._inputStream.dispose();
	}

	private _inputStream: IInputStream;
	private _decryptor: (num: number) => number;
}


export function simpleTsezarEncrypt(code: number): Translator {
	return (numb) => (numb + code) % 256
}

export function simpleTsezarDecrypt(code: number): Translator {
	return (numb) => (numb - code) % 256
}