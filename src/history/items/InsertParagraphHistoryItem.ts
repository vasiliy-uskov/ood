import {Document} from "../../model/Document";
import {DocumentItem} from "../../model/DocumentItem";
import {IHistoryItem} from "./IHistoryItem";
import {insertItem} from "../../model/EditDocumentUtils";

export class InsertParagraphHistoryItem implements IHistoryItem {
	constructor(document: Document, text: string, position: number = document.content.length) {
		const documentItem = DocumentItem.fromParagraph({text});
		const newDocument = insertItem(document, documentItem, position);
		if (!newDocument)
		{
			throw new Error('Неверная позиция');
		}
		this.document = newDocument;
	}

	commit(): void {}

	dispose(): void {}

	public readonly document: Document;
}