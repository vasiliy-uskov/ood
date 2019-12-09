export class MockLogger {
	getLogger(): (str: string) => void {
		return this._logger;
	}

	matchResult(): void {
		expect(this._result).toMatchSnapshot();
	}

	private _result = '';
	private _logger = (str: string) => {
		this._result = this._result + str + '\n';
	}
}