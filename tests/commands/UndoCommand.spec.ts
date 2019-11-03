import {UndoCommand} from "../../src/command/UndoCommand";
import {createEditor} from "../mocks/DocumentData";

it('return help', () => {
	const command = new UndoCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match Undo', () => {
		const command = new UndoCommand(createEditor());
		expect(command.is('Undo')).toBe(true);
		expect(command.is('Undo ')).toBe(false);
		expect(command.is('Undo.')).toBe(false);
		expect(command.is(' Undo')).toBe(false);
		expect(command.is('Red')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call undo method without any arguments', () => {
		const editor = createEditor();
		const command = new UndoCommand(editor);
		expect(editor.undo).not.toBeCalled();
		command.execute();
		expect(editor.undo).toBeCalledTimes(1);
		expect(editor.undo).toBeCalledWith();
	});
});