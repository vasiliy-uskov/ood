import {Document} from "../../model/Document";
import {IHistoryItem} from "./IHistoryItem";
import {modifyItem} from "../../model/EditDocumentUtils";
import {DocumentItem} from "../../model/DocumentItem";
import {Size} from "../../utils/Size";

function resizeImage(item: DocumentItem, size: Size): DocumentItem {
	const image = item.toImage();
	if (!image)
	{
		throw new Error('В указанной позиции нет картинки.')
	}
	return DocumentItem.fromImage({
		...image,
		size,
	})
}

export class ResizeImageHistoryItem implements IHistoryItem {
	constructor(document: Document, size: Size, position: number) {
		const newDocument = modifyItem(
			document,
			position,
			item => resizeImage(item, size)
		);
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