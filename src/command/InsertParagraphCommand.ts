import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class InsertParagraphCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^InsertParagraph.*/);
	}

	execute(command: string) {
		const res = command.match(/^InsertParagraph\s(end|\d+)\s(.+)/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		const text = res[2] || '';
		const position = parseInt(res[1] || '');
		this._editor.insertParagraph(text, isNaN(position) ? undefined : position);
	}

	help(): string {
		return 'InsertParagraph <позиция>|end <текст параграфа>';
	}
	private _editor: IEditor;
}