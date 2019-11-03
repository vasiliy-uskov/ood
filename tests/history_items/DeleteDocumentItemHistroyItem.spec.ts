import {createDocument, createDocumentByImage, createImage, createParagraph, documentWithContent, emptyDocument} from "../mocks/DocumentData";
import {DeleteDocumentItemHistoryItem} from "../../src/history/items/DeleteDocumentItemHistoryItem";
import {DocumentItem} from "../../src/model/DocumentItem";

it('throw exception, when try to create by invalid index', () => {
	expect(() => new DeleteDocumentItemHistoryItem(emptyDocument, 0)).toThrow();
	expect(() => new DeleteDocumentItemHistoryItem(emptyDocument, -1)).toThrow();
	expect(() => new DeleteDocumentItemHistoryItem(emptyDocument, 1)).toThrow();
	expect(() => new DeleteDocumentItemHistoryItem(documentWithContent, -1)).toThrow();
	expect(() => new DeleteDocumentItemHistoryItem(documentWithContent, documentWithContent.content.length)).toThrow();
	expect(() => new DeleteDocumentItemHistoryItem(documentWithContent, documentWithContent.content.length + 1)).toThrow();
});

it('dispose image on commit', () => {
	const image = createImage({
		width: 0,
		height: 0,
	});
	const item = new DeleteDocumentItemHistoryItem(createDocumentByImage(image), 0);
	expect(image.img.dispose).not.toBeCalled();
	item.commit();
	expect(image.img.dispose).toBeCalledTimes(1);
});

it('do noting on commit paragraph deleting', () => {
	const item = new DeleteDocumentItemHistoryItem(createDocument([
		DocumentItem.fromParagraph(createParagraph('text')),
	]), 0);
	item.commit();
});

it('do not dispose image on dispose', () => {
	const image = createImage({
		width: 0,
		height: 0,
	});
	const item = new DeleteDocumentItemHistoryItem(createDocumentByImage(image), 0);
	expect(image.img.dispose).not.toBeCalled();
	item.dispose();
	expect(image.img.dispose).not.toBeCalled();
});