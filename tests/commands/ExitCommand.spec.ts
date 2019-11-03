import {ExitCommand} from "../../src/command/ExitCommand";

it('return help', () => {
	const command = new ExitCommand();
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match Exit', () => {
		const command = new ExitCommand();
		expect(command.is('Exit')).toBe(true);
		expect(command.is('Exit ')).toBe(false);
		expect(command.is('Exit.')).toBe(false);
		expect(command.is(' Exit')).toBe(false);
		expect(command.is('Red')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call undo method without any arguments', () => {
		const exitMock = jest.fn();
		//@ts-ignore
		process.exit = exitMock;
		const command = new ExitCommand();
		expect(exitMock).not.toBeCalled();
		command.execute();
		expect(exitMock).toBeCalledTimes(1);
		expect(exitMock).toBeCalledWith(0);
	});
});