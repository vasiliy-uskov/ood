import {Document} from "../../model/Document";
import {DocumentItem} from "../../model/DocumentItem";
import {IHistoryItem} from "./IHistoryItem";
import {deleteItem} from "../../model/EditDocumentUtils";

export class DeleteDocumentItemHistoryItem implements IHistoryItem {
	constructor(document: Document, position: number) {
		this._documentItem = document.content[position];
		const newDocument = deleteItem(document, position);
		if (!newDocument)
		{
			throw new Error('Неверная позиция');
		}
		this.document = newDocument;
	}

	commit(): void {
		const image = this._documentItem.toImage();
		if (image)
		{
			image.img.dispose();
		}
	}

	dispose(): void {}

	readonly document: Document;

	private readonly _documentItem: DocumentItem;
}