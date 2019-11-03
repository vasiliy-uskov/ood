import {createEditor} from "../mocks/DocumentData";
import {HelpCommand} from "../../src/command/HelpCommand";
import {ConsoleLogMock} from "../mocks/ConsoleLogMock";
import {createCommands} from "../../src/command/CommandsCreator";

it('return help', () => {
	const command = new HelpCommand([]);
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new HelpCommand([]);
		expect(command.is('Help')).toBe(true);
		expect(command.is('Help ')).toBe(false);
		expect(command.is('Hel')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('log to console help', () => {
		const command = new HelpCommand(createCommands(createEditor()));
		ConsoleLogMock.startMock();
		command.execute();
		expect(ConsoleLogMock.result()).toMatchSnapshot();
		ConsoleLogMock.stopMock();
	});
});