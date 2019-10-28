import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class SetDocumentTitleCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^SetTitle.*/);
	}

	execute(command: string) {
		const res = command.match(/^SetTitle\s(.+)/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		this._editor.setDocumentTitle(res[1]);
	}

	help(): string {
		return 'SetTitle <позиция> <текст параграфа>';
	}
	private _editor: IEditor;
}