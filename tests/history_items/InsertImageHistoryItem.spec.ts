import {createDocument, createImage, documentWithContent, emptyDocument} from "../document/DocumentData";
import {InsertImageHistoryItem} from "../../src/history/items/InsertImageHistoryItem";
import {DocumentItem} from "../../src/model/DocumentItem";

const size = {
	width: 10,
	height: 15,
};
it('throw exception, when try to create by invalid index', () => {
	const image = createImage(size);
	expect(() => new InsertImageHistoryItem(documentWithContent, image, -1)).toThrow();
	expect(() => new InsertImageHistoryItem(documentWithContent, image, documentWithContent.content.length + 1)).toThrow();
});

it('dispose image resource if fail to create item', () => {
	const image = createImage(size);
	expect(image.img.dispose).not.toBeCalled();
	expect(() => new InsertImageHistoryItem(documentWithContent, image, -1)).toThrow();
	expect(image.img.dispose).toBeCalledTimes(1);
});

it('insert item at the end if index is not specified', () => {
	const image = createImage(size);
	const documentItem = DocumentItem.fromImage(image);
	const item = new InsertImageHistoryItem(documentWithContent, image);
	expect(item.document).toEqual(createDocument([
		documentWithContent.content[0],
		documentWithContent.content[1],
		documentWithContent.content[2],
		documentWithContent.content[3],
		documentItem
	]));
});

it('dispose image on dispose', () => {
	const image = createImage(size);
	const item = new InsertImageHistoryItem(emptyDocument, image, 0);
	expect(image.img.dispose).not.toBeCalled();
	item.dispose();
	expect(image.img.dispose).toBeCalledTimes(1);
});

it('do not dispose image on commit', () => {
	const image = createImage(size);
	const item = new InsertImageHistoryItem(emptyDocument, image, 0);
	expect(image.img.dispose).not.toBeCalled();
	item.commit();
	expect(image.img.dispose).not.toBeCalled();
});