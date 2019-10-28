import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class ReplaceParagraphTextCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^ReplaceText.*/);
	}

	execute(command: string) {
		const res = command.match(/^ReplaceText\s(\d+)\s(.+)/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		const text = res[2] || '';
		const position = parseInt(res[1]);
		this._editor.replaceParagraphText(text, position);
	}

	help(): string {
		return 'ReplaceText <позиция> <текст параграфа>';
	}
	private _editor: IEditor;
}