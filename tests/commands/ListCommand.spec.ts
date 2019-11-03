import {createEditor} from "../mocks/DocumentData";
import {ListCommand} from "../../src/command/ListCommand";

it('return help', () => {
	const command = new ListCommand(createEditor(), () => {});
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match List', () => {
		const command = new ListCommand(createEditor(), () => {});
		expect(command.is('List')).toBe(true);
		expect(command.is('List ')).toBe(false);
		expect(command.is('List.')).toBe(false);
		expect(command.is(' List')).toBe(false);
		expect(command.is('Lis')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call document printer with editor`s document', () => {
		const mockPrinter = jest.fn();
		const editor = createEditor();
		const command = new ListCommand(editor, mockPrinter);
		expect(mockPrinter).not.toBeCalled();
		command.execute();
		expect(mockPrinter).toBeCalledTimes(1);
		expect(mockPrinter).toBeCalledWith(editor.document());
	});
});