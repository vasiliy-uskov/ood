import {IEditor} from "../IEditor";

export class RedoCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^Redo$/);
	}

	execute() {
		this._editor.redo();
	}

	help(): string {
		return 'Redo';
	}
	private _editor: IEditor;
}