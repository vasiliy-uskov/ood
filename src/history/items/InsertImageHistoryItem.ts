import {Document} from "../../model/Document";
import {DocumentItem} from "../../model/DocumentItem";
import {Image} from "../../model/element/Image";
import {IHistoryItem} from "./IHistoryItem";
import {insertItem} from "../../model/EditDocumentUtils";

export class InsertImageHistoryItem implements IHistoryItem {
	constructor(document: Document, image: Image, position: number = document.content.length) {
		this._image = image;
		const documentItem = DocumentItem.fromImage(this._image);
		const newDocument = insertItem(document, documentItem, position);
		if (!newDocument)
		{
			image.img.dispose();
			throw new Error('Неверная позиция');
		}
		this.document = newDocument;
	}

	commit(): void {}

	dispose(): void {
		this._image.img.dispose();
	}

	readonly document: Document;

	private readonly _image: Image;
}