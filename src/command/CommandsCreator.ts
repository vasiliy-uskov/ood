import {IEditor} from "../IEditor";
import {ICommand} from "./ICommand";
import {DeleteItemCommand} from "./DeleteItemCommand";
import {InsertImageCommand} from "./InsertImageCommand";
import {InsertParagraphCommand} from "./InsertParagraphCommand";
import {ReplaceParagraphTextCommand} from "./ReplaceParagraphTextCommand";
import {ResizeImageCommand} from "./ResizeImageCommand";
import {SaveDocumentCommand} from "./SaveDocumentCommand";
import {UndoCommand} from "./UndoCommand";
import {RedoCommand} from "./RedoCommand";
import {ListCommand} from "./ListCommand";
import {SetDocumentTitleCommand} from "./SetDocumentTitleCommand";
import {ExitCommand} from "./ExitCommand";
import {HelpCommand} from "./HelpCommand";
import {DocumentLogger} from "../view/DocumentLogger";
import {HTMLDocumentSaver} from "../view/HTMLDocumentSaver";

export function createCommands(editor: IEditor): Array<ICommand> {
	const commands: Array<ICommand> = [
		new DeleteItemCommand(editor),
		new InsertImageCommand(editor),
		new InsertParagraphCommand(editor),
		new ReplaceParagraphTextCommand(editor),
		new ResizeImageCommand(editor),
		new SaveDocumentCommand(editor, HTMLDocumentSaver.save),
		new UndoCommand(editor),
		new RedoCommand(editor),
		new ListCommand(editor, DocumentLogger.log),
		new SetDocumentTitleCommand(editor),
		new ExitCommand(),
	];
	const helpCommand = new HelpCommand(commands);
	commands.push(helpCommand);
	return  commands;
}