import {createEditor} from "../mocks/DocumentData";
import {InsertParagraphCommand} from "../../src/command/InsertParagraphCommand";

it('return help', () => {
	const command = new InsertParagraphCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new InsertParagraphCommand(createEditor());
		expect(command.is('InsertParagraph 0 text')).toBe(true);
		expect(command.is('InsertParagraph ')).toBe(true);
		expect(command.is('InsertParagraph')).toBe(true);
		expect(command.is('DeleteItem')).toBe(false);
		expect(command.is(' InsertParagraph')).toBe(false);
		expect(command.is('InsertParagrap')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call insertParagraph method if parse parameters', () => {
		const editor = createEditor();
		const command = new InsertParagraphCommand(editor);
		expect(editor.insertParagraph).not.toBeCalled();
		command.execute('InsertParagraph 0 text');
		expect(editor.insertParagraph).toBeCalledTimes(1);
		expect(editor.insertParagraph).toBeCalledWith('text', 0);
		command.execute('InsertParagraph end text');
		expect(editor.insertParagraph).toBeCalledTimes(2);
		expect(editor.insertParagraph).toBeCalledWith('text', undefined);
		command.execute('InsertParagraph end  ');
		expect(editor.insertParagraph).toBeCalledTimes(3);
		expect(editor.insertParagraph).toBeCalledWith(' ', undefined);
	});
	it('throw error if do not parse parameters', () => {
		const command = new InsertParagraphCommand(createEditor());
		expect(() => command.execute('InsertParagraph 0 ')).toThrow();
		expect(() => command.execute('InsertParagraph 0')).toThrow();
		expect(() => command.execute('InsertParagraph 0a')).toThrow();
		expect(() => command.execute('InsertParagraph enda')).toThrow();
	});
});