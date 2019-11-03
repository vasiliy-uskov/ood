import {IEditor} from "../IEditor";
import {WrongCommandError} from "./WrongCommandError";

export class ResizeImageCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^ResizeImage.*/);
	}

	execute(command: string) {
		const res = command.match(/^ResizeImage\s(\d+)\s(\d+)\s(\d+)$/);
		if (!res)
		{
			throw new WrongCommandError(this.help());
		}
		const position = parseInt(res[1]);
		const width = parseInt(res[2]);
		const height = parseInt(res[3]);
		this._editor.resizeImage({width, height}, position);
	}

	help(): string {
		return 'ResizeImage <позиция> <ширина> <высота>';
	}
	private _editor: IEditor;
}