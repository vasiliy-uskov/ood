import {createEditor} from "../mocks/DocumentData";
import {DeleteItemCommand} from "../../src/command/DeleteItemCommand";

it('return help', () => {
	const command = new DeleteItemCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new DeleteItemCommand(createEditor());
		expect(command.is('DeleteItem bla bla')).toBe(true);
		expect(command.is('DeleteItem')).toBe(true);
		expect(command.is('DeleteItem')).toBe(true);
		expect(command.is('DeleteIte')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call deleteItem method if parse parameters', () => {
		const editor = createEditor();
		const command = new DeleteItemCommand(editor);
		expect(editor.deleteItem).not.toBeCalled();
		command.execute('DeleteItem 0');
		expect(editor.deleteItem).toBeCalledTimes(1);
		expect(editor.deleteItem).toBeCalledWith(0);
		command.execute('DeleteItem 20');
		expect(editor.deleteItem).toBeCalledTimes(2);
		expect(editor.deleteItem).toBeCalledWith(20);
	});
	it('throw error if do not parse parameters', () => {
		const command = new DeleteItemCommand(createEditor());
		expect(() => command.execute('DeleteItem 0a')).toThrow();
		expect(() => command.execute('DeleteItem  0')).toThrow();
	});
});