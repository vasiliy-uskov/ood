import {ILogger} from "../src/ILogger";

export class MockLogger implements ILogger {
	log(str: string): void {
		this._result = this._result + str + '\n';
	}

	result(): string {
		return this._result;
	}

	private _result = '';
}