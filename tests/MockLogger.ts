import {ILogger} from "../src/ILogger";

export class MockLogger implements ILogger {
	log(str: string): void {
		this._result = this._result + str + '\n';
	}

	matchResult(): void {
		expect(this._result).toMatchSnapshot();
	}

	private _result = '';
}