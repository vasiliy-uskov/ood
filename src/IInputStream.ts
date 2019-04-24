import {IDisposable} from "./IDisposable";

export interface IInputStream extends IDisposable {
	eof(): boolean;
	readBuffer(bytesCount: number): Buffer;
}