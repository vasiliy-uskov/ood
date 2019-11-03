import {createEditor} from "../mocks/DocumentData";
import {ReplaceParagraphTextCommand} from "../../src/command/ReplaceParagraphTextCommand";

it('return help', () => {
	const command = new ReplaceParagraphTextCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new ReplaceParagraphTextCommand(createEditor());
		expect(command.is('ReplaceText 0 text')).toBe(true);
		expect(command.is('ReplaceText ')).toBe(true);
		expect(command.is('ReplaceText')).toBe(true);
		expect(command.is('DeleteItem')).toBe(false);
		expect(command.is(' ReplaceText')).toBe(false);
		expect(command.is('ReplaceTex')).toBe(false);
		expect(command.is('eplaceText')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call replaceParagraphText method if parse parameters', () => {
		const editor = createEditor();
		const command = new ReplaceParagraphTextCommand(editor);
		expect(editor.replaceParagraphText).not.toBeCalled();
		command.execute('ReplaceText 0 text');
		expect(editor.replaceParagraphText).toBeCalledTimes(1);
		expect(editor.replaceParagraphText).toBeCalledWith('text', 0);
	});
	it('throw error if do not parse parameters', () => {
		const command = new ReplaceParagraphTextCommand(createEditor());
		expect(() => command.execute('ReplaceText 0')).toThrow();
		expect(() => command.execute('ReplaceText 0 ')).toThrow();
		expect(() => command.execute('ReplaceText 0a')).toThrow();
		expect(() => command.execute('ReplaceText end text')).toThrow();
		expect(() => command.execute('ReplaceText enda')).toThrow();
	});
});