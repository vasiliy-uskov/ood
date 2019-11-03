import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";
import {ReadonlyDocument} from "../model/Document";

export class SaveDocumentCommand {
	constructor(editor: IEditor, saveDocumentFn: (location: string, document: ReadonlyDocument) => void) {
		this._editor = editor;
		this._saveDocumentFn = saveDocumentFn;
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
		this._saveDocumentFn(res[1], this._editor.document());
	}

	help(): string {
		return 'Save <путь>';
	}

	private _editor: IEditor;
	private _saveDocumentFn: (location: string, document: ReadonlyDocument) => void;
}