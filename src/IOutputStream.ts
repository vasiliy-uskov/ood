import {IDisposable} from "./IDisposable";

export interface IOutputStream extends IDisposable {
	writeBuffer(array: Buffer): void;
}