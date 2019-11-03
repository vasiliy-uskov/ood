import {createEditor} from "../mocks/DocumentData";
import {SetDocumentTitleCommand} from "../../src/command/SetDocumentTitleCommand";

it('return help', () => {
	const command = new SetDocumentTitleCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command match Undo', () => {
		const command = new SetDocumentTitleCommand(createEditor());
		expect(command.is('SetTitle text')).toBe(true);
		expect(command.is('SetTitle ')).toBe(true);
		expect(command.is('SetTitle')).toBe(true);
		expect(command.is('SetTitl')).toBe(false);
		expect(command.is('eetTitle')).toBe(false);
		expect(command.is(' SetTitle')).toBe(false);
		expect(command.is('Redo')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call setDocumentTitle method if parse parameters', () => {
		const editor = createEditor();
		const command = new SetDocumentTitleCommand(editor);
		expect(editor.setDocumentTitle).not.toBeCalled();
		command.execute('SetTitle text');
		expect(editor.setDocumentTitle).toBeCalledTimes(1);
		expect(editor.setDocumentTitle).toBeCalledWith('text');
	});
	it('throw error if do not parse parameters', () => {
		const command = new SetDocumentTitleCommand(createEditor());
		expect(() => command.execute('SetTitle')).toThrow();
		expect(() => command.execute('SetTitle')).toThrow();
	});
});