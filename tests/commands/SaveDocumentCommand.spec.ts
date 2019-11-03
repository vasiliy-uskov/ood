import {createEditor} from "../mocks/DocumentData";
import {SaveDocumentCommand} from "../../src/command/SaveDocumentCommand";

it('return help', () => {
	const command = new SaveDocumentCommand(createEditor(), () => {});
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match SaveDocument', () => {
		const command = new SaveDocumentCommand(createEditor(), () => {});
		expect(command.is('Save')).toBe(true);
		expect(command.is('Save ')).toBe(true);
		expect(command.is(' Save')).toBe(false);
		expect(command.is(' Sav')).toBe(false);
		expect(command.is('save')).toBe(false);
		expect(command.is('List')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call document printer with editor`s document', () => {
		const mockSaver = jest.fn();
		const editor = createEditor();
		const command = new SaveDocumentCommand(editor, mockSaver);
		expect(mockSaver).not.toBeCalled();
		command.execute('Save ./image');
		expect(mockSaver).toBeCalledTimes(1);
		expect(mockSaver).toBeCalledWith('./image', editor.document());
	});
	it('throw error if do not parse parameters', () => {
		const command = new SaveDocumentCommand(createEditor(), () => {});
		expect(() => command.execute('Save')).toThrow();
		expect(() => command.execute(' Save ')).toThrow();
		expect(() => command.execute('')).toThrow();
		expect(() => command.execute('DeleteItem')).toThrow();
	});
});