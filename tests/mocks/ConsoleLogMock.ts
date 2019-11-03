export class ConsoleLogMock {
	public static startMock() {
		this._result = '';
		console.log = (...args: Array<string>) => {
			this._result = this._result + args.join(' ') + '\n';
		};
	}
	public static result() {
		return this._result;
	}
	public static stopMock() {
		this._result = '';
		console.log = this._consoleLogFn;
	}
	private static _result = '';
	private static _consoleLogFn = console.log;
}