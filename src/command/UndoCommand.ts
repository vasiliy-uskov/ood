import {IEditor} from "../IEditor";

export class UndoCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^Undo$/);
	}

	execute() {
		this._editor.undo();
	}

	help(): string {
		return 'Undo';
	}
	private _editor: IEditor;
}