import {Document} from "../../model/Document";
import {IHistoryItem} from "./IHistoryItem";
import {modifyItem} from "../../model/EditDocumentUtils";
import {DocumentItem} from "../../model/DocumentItem";

export class ReplaceParagraphTextHistoryItem implements IHistoryItem {
	constructor(document: Document, text: string, position: number) {
		const newDocument = modifyItem(
			document,
			position,
			() => DocumentItem.fromParagraph({text}),
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