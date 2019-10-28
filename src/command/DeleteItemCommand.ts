import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class DeleteItemCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^DeleteItem.*/);
	}

	execute(command: string) {
		const res = command.match(/^DeleteItem\s(\d+)$/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		const position = parseInt(res[1]);
		this._editor.deleteItem(position);
	}

	help(): string {
		return 'DeleteItem <позиция> <текст параграфа>';
	}
	private _editor: IEditor;
}