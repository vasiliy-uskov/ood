import {RedoCommand} from "../../src/command/RedoCommand";
import {createEditor} from "../mocks/DocumentData";

it('return help', () => {
	const command = new RedoCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match Redo', () => {
		const command = new RedoCommand(createEditor());
		expect(command.is('Redo')).toBe(true);
		expect(command.is('Redo ')).toBe(false);
		expect(command.is('Redo.')).toBe(false);
		expect(command.is(' Redo')).toBe(false);
		expect(command.is('Red')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call redo method without any arguments', () => {
		const editor = createEditor();
		const command = new RedoCommand(editor);
		expect(editor.redo).not.toBeCalled();
		command.execute();
		expect(editor.redo).toBeCalledTimes(1);
		expect(editor.redo).toBeCalledWith();
	});
});