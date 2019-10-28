import {MockEditor} from "./MockEditor";
import {createDocument} from "../document/DocumentData";
import {HelpCommand} from "../../src/command/HelpCommand";
import {DeleteItemCommand} from "../../src/command/DeleteItemCommand";
import {InsertImageCommand} from "../../src/command/InsertImageCommand";
import {InsertParagraphCommand} from "../../src/command/InsertParagraphCommand";
import {ReplaceParagraphTextCommand} from "../../src/command/ReplaceParagraphTextCommand";
import {ResizeImageCommand} from "../../src/command/ResizeImageCommand";
import {SaveDocumentCommand} from "../../src/command/SaveDocumentCommand";
import {UndoCommand} from "../../src/command/UndoCommand";
import {RedoCommand} from "../../src/command/RedoCommand";
import {ListCommand} from "../../src/command/ListCommand";
import {SetDocumentTitleCommand} from "../../src/command/SetDocumentTitleCommand";
import {ICommand} from "../../src/command/ICommand";

it('return help', () => {
	const command = new HelpCommand([]);
	expect(command.help()).toMatchSnapshot();
});

function createAllCommands(): Array<ICommand> {
	const editor = new MockEditor(createDocument([]));
	const commands: Array<ICommand> = [
		new DeleteItemCommand(editor),
		new InsertImageCommand(editor),
		new InsertParagraphCommand(editor),
		new ReplaceParagraphTextCommand(editor),
		new ResizeImageCommand(editor),
		new SaveDocumentCommand(editor),
		new UndoCommand(editor),
		new RedoCommand(editor),
		new ListCommand(editor),
		new SetDocumentTitleCommand(editor),
	];
	commands.push(new HelpCommand(commands));
	return commands;
}

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
		const command = new HelpCommand(createAllCommands());
		let res = '';
		console.log = (...args: Array<string>) => {
			res = res + args.join(' ') + '\n';
		};
		command.execute();
		expect(res).toMatchSnapshot();
	});
});