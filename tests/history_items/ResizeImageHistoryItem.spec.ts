import {createDocument, createImage, emptyDocument} from "../document/DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";
import {Document} from "../../src/model/Document";
import {ResizeImageHistoryItem} from "../../src/history/items/ResizeImageHistoryItem";
import {Image} from "../../src/model/element/Image";

const oldSize = {
	width: 10,
	height: 10,
};

const documentWithContent = createDocument([
	DocumentItem.fromImage(createImage(oldSize)),
	DocumentItem.fromImage(createImage(oldSize)),
	DocumentItem.fromImage(createImage(oldSize)),
	DocumentItem.fromImage(createImage(oldSize)),
]);

function getImage(document: Document, index: number): Image {
	const image = document.content[index].toImage();
	if (!image)
	{
		throw new Error();
	}
	return image;
}

function checkImagesEquals(oldDocument: Document, newDocument: Document, itemIndex: number) {
	const firstItem = getImage(newDocument, itemIndex);
	const oldFirstItem = getImage(oldDocument, itemIndex);
	expect(firstItem).toEqual(oldFirstItem);
}

const newSize = {
	width: 15,
	height: 20,
};

it('throw exception, when try to create by invalid index', () => {
	expect(() => new ResizeImageHistoryItem(emptyDocument, newSize, 0)).toThrow();
	expect(() => new ResizeImageHistoryItem(emptyDocument, newSize, -1)).toThrow();
	expect(() => new ResizeImageHistoryItem(emptyDocument, newSize, 1)).toThrow();
	expect(() => new ResizeImageHistoryItem(documentWithContent, newSize, -1)).toThrow();
	expect(() => new ResizeImageHistoryItem(documentWithContent, newSize, documentWithContent.content.length)).toThrow();
	expect(() => new ResizeImageHistoryItem(documentWithContent, newSize, documentWithContent.content.length + 1)).toThrow();
});


it('insert item at the end index', () => {
	const item = new ResizeImageHistoryItem(documentWithContent, newSize, 2);
	expect(item.document.content.length).toBe(documentWithContent.content.length);
	checkImagesEquals(documentWithContent, item.document, 0);
	checkImagesEquals(documentWithContent, item.document, 1);
	checkImagesEquals(documentWithContent, item.document, 3);
	const newItem = getImage(item.document, 2);
	const oldItem = getImage(documentWithContent, 2);
	expect(newItem.size).toEqual(newSize);
	expect(oldItem.img).toEqual(newItem.img);
});