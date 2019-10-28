import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class InsertImageCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^InsertImage.*/);
	}

	execute(command: string) {
		const res = command.match(/^InsertImage\s(end|\d+)\s(\d+)\s(\d+)\s(.+)/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		const position = parseInt(res[1] || '');
		const width = parseInt(res[2]);
		const height = parseInt(res[3]);
		const path = res[4] || '';
		this._editor.insertImage({width, height}, path, isNaN(position) ? undefined : position);
	}

	help(): string {
		return 'InsertImage <позиция>|end <ширина> <высота> <путь к файлу изображения>';
	}
	private _editor: IEditor;
}