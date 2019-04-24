import {IDisposable} from "./IDisposable";
import {closeSync, openSync} from "fs";


export abstract class FileStream implements IDisposable{
	constructor(fileName: string, mode: string) {
		this._fd = openSync(fileName, mode);
	}

	dispose() {
		closeSync(this._fd);
	}

	protected _fd: number;
}