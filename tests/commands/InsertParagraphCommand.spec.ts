import {MockEditor} from "./MockEditor";
import {createDocument, createParagraph} from "../document/DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";
import {InsertParagraphCommand} from "../../src/command/InsertParagraphCommand";

it('return help', () => {
	const editor = new MockEditor(createDocument([]));
	const command = new InsertParagraphCommand(editor);
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const editor = new MockEditor(createDocument([]));
		const command = new InsertParagraphCommand(editor);
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
	it('call deleteItem method if parse parameters', () => {
		const editor = new MockEditor(createDocument([
			DocumentItem.fromParagraph(createParagraph('text')),
		]));
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
		const editor = new MockEditor(createDocument([
			DocumentItem.fromParagraph(createParagraph('text')),
		]));
		const command = new InsertParagraphCommand(editor);
		expect(editor.deleteItem).not.toBeCalled();
		expect(() => command.execute('InsertParagraph 0 ')).toThrow();
		expect(() => command.execute('InsertParagraph 0a')).toThrow();
		expect(() => command.execute('InsertParagraph enda')).toThrow();
	});
});