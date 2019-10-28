import {ReadonlyDocument, Document} from "../../src/model/Document";

export class MockEditor {
	constructor(document: Document) {
		this._document = document;
	}

	document(): ReadonlyDocument {
		return this._document;
	}

	undo = jest.fn();

	redo = jest.fn();

	insertParagraph = jest.fn();

	replaceParagraphText = jest.fn();

	insertImage = jest.fn();

	resizeImage = jest.fn();

	deleteItem = jest.fn();

	setDocumentTitle = jest.fn();

	private readonly _document: Document;
}