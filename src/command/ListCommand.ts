import {IEditor} from "../IEditor";
import {ConsoleDocumentView} from "../view/ConsoleDocumentView";

export class ListCommand {
	constructor(editor: IEditor) {
		this._editor = editor;
	}

	is(command: string): boolean {
		return !!command.match(/^List$/);
	}

	execute() {
		this._documentView.draw(this._editor.document());
	}

	help(): string {
		return 'List';
	}

	private _editor: IEditor;
	private _documentView = new ConsoleDocumentView();
}