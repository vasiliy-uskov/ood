import {IEditor} from "../IEditor";
import {ReadonlyDocument} from "../model/Document";

export class ListCommand {
	constructor(editor: IEditor, printDocumentFn: (document: ReadonlyDocument) => void) {
		this._editor = editor;
		this._printDocumentFn = printDocumentFn;
	}

	is(command: string): boolean {
		return !!command.match(/^List$/);
	}

	execute() {
		this._printDocumentFn(this._editor.document());
	}

	help(): string {
		return 'List';
	}

	private _editor: IEditor;
	private _printDocumentFn: (document: ReadonlyDocument) => void;
}