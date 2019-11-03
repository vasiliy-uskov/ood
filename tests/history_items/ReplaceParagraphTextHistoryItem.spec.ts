import {createDocument, createParagraph, documentWithContent, emptyDocument} from "../mocks/DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";
import {ReplaceParagraphTextHistoryItem} from "../../src/history/items/ReplaceParagraphTextHistoryItem";

const text = 'text';
it('throw exception, when try to create by invalid index', () => {
	expect(() => new ReplaceParagraphTextHistoryItem(emptyDocument, text, 0)).toThrow();
	expect(() => new ReplaceParagraphTextHistoryItem(emptyDocument, text, -1)).toThrow();
	expect(() => new ReplaceParagraphTextHistoryItem(emptyDocument, text, 1)).toThrow();
	expect(() => new ReplaceParagraphTextHistoryItem(documentWithContent, text, -1)).toThrow();
	expect(() => new ReplaceParagraphTextHistoryItem(documentWithContent, text, documentWithContent.content.length)).toThrow();
	expect(() => new ReplaceParagraphTextHistoryItem(documentWithContent, text, documentWithContent.content.length + 1)).toThrow();
});


it('insert item at the end index', () => {
	const item = new ReplaceParagraphTextHistoryItem(documentWithContent, text, 2);
	expect(item.document).toEqual(createDocument([
		documentWithContent.content[0],
		documentWithContent.content[1],
		DocumentItem.fromParagraph(createParagraph(text)),
		documentWithContent.content[3],
	]));
});

it('do noting on commit', () => {
	const item = new ReplaceParagraphTextHistoryItem(documentWithContent, text, 2);
	item.commit();
});

it('do noting on dispose', () => {
	const item = new ReplaceParagraphTextHistoryItem(documentWithContent, text, 2);
	item.dispose();
});