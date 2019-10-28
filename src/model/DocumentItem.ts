import {Image, ReadonlyImage} from "./element/Image";
import {Paragraph} from "./element/Paragraph";

export enum DocumentItemType {
	IMAGE = 'image',
	PARAGRAPH = 'paragraph',
}

type ContentItemType = Image|Paragraph

export class DocumentItem {
	private constructor(itemType: DocumentItemType, item: ContentItemType) {
		this._item = item;
		this._itemType = itemType;
	}

	toParagraph(): Paragraph | null {
		if (this._itemType === DocumentItemType.PARAGRAPH)
		{
			return this._item as Paragraph;
		}
		return null
	}

	toImage(): Image | null {
		if (this._itemType === DocumentItemType.IMAGE)
		{
			return this._item as Image;
		}
		return null
	}

	static fromImage(image: Image) {
		return new DocumentItem(DocumentItemType.IMAGE, image);
	}

	static fromParagraph(paragraph: Paragraph) {
		return new DocumentItem(DocumentItemType.PARAGRAPH, paragraph);
	}


	private readonly _itemType: DocumentItemType;
	private readonly _item: ContentItemType;
}

export interface ReadonlyDocumentItem {
	toParagraph(): Paragraph | null;
	toImage(): ReadonlyImage | null;
}