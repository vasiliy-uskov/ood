import {createDocument, createParagraph, documentWithContent} from "../document/DocumentData";
import {InsertParagraphHistoryItem} from "../../src/history/items/InsertParagraphHistoryItem";
import {DocumentItem} from "../../src/model/DocumentItem";

const text = 'text';
it('throw exception, when try to create by invalid index', () => {
	expect(() => new InsertParagraphHistoryItem(documentWithContent, text, -1)).toThrow();
	expect(() => new InsertParagraphHistoryItem(documentWithContent, text, documentWithContent.content.length + 1)).toThrow();
});


it('insert item at the end index', () => {
	const item = new InsertParagraphHistoryItem(documentWithContent, text, 2);
	expect(item.document).toEqual(createDocument([
		documentWithContent.content[0],
		documentWithContent.content[1],
		DocumentItem.fromParagraph(createParagraph(text)),
		documentWithContent.content[2],
		documentWithContent.content[3],
	]));
});

it('insert item at the end if index is not specified', () => {
	const item = new InsertParagraphHistoryItem(documentWithContent, text);
	expect(item.document).toEqual(createDocument([
		documentWithContent.content[0],
		documentWithContent.content[1],
		documentWithContent.content[2],
		documentWithContent.content[3],
		DocumentItem.fromParagraph(createParagraph(text))
	]));
});