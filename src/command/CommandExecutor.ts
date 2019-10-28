import {IEditor} from "../IEditor";
import {DeleteItemCommand} from "./DeleteItemCommand";
import {HelpCommand} from "./HelpCommand";
import {InsertImageCommand} from "./InsertImageCommand";
import {InsertParagraphCommand} from "./InsertParagraphCommand";
import {ReplaceParagraphTextCommand} from "./ReplaceParagraphTextCommand";
import {ResizeImageCommand} from "./ResizeImageCommand";
import {SaveDocumentCommand} from "./SaveDocumentCommand";
import {UndoCommand} from "./UndoCommand";
import {RedoCommand} from "./RedoCommand";
import {ListCommand} from "./ListCommand";
import {SetDocumentTitleCommand} from "./SetDocumentTitleCommand";
import {ICommand} from "./ICommand";

export class CommandExecutor {
	constructor(editor: IEditor) {
		this._editor = editor;
		this._commands = [];
		this._commands.push(new DeleteItemCommand(this._editor));
		this._commands.push(new InsertImageCommand(this._editor));
		this._commands.push(new InsertParagraphCommand(this._editor));
		this._commands.push(new ReplaceParagraphTextCommand(this._editor));
		this._commands.push(new ResizeImageCommand(this._editor));
		this._commands.push(new SaveDocumentCommand(this._editor));
		this._commands.push(new UndoCommand(this._editor));
		this._commands.push(new RedoCommand(this._editor));
		this._commands.push(new ListCommand(this._editor));
		this._commands.push(new SetDocumentTitleCommand(this._editor));
		this._helpCommand = new HelpCommand(this._commands);
		this._commands.push(this._helpCommand);
	}

	execute(commandStr: string) {
		const command = this._commands.find((command) => command.is(commandStr));
		if (!command)
		{
			console.log('Undefined command.');
			this._helpCommand.execute();
		}
		else
		{
			try
			{
				command.execute(commandStr);
			}
			catch (e) {
				console.log(e);
			}
		}
	}

	private readonly _editor: IEditor;
	private readonly _helpCommand: HelpCommand;
	private readonly _commands: Array<ICommand>;
}
