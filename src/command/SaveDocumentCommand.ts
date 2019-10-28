import {IEditor} from "../IEditor";
import {HTMLDocumentView} from "../view/HTMLDocumentView";
import {WrongCommandError} from "./WrongCommandError";

export class SaveDocumentCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^Save.*/);
	}

	execute(command: string) {
		const res = command.match(/^Save\s(.+)/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		(new HTMLDocumentView(res[1])).draw(this._editor.document());
	}

	help(): string {
		return 'Save <путь>';
	}

	private _editor: IEditor;
}