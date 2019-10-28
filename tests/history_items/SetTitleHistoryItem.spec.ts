import {SetTitleHistoryItem} from "../../src/history/items/SetTitleHistoryItem";
import {documentWithContent, emptyDocument} from "../document/DocumentData";

it('set title to empty document', () => {
	const item = new SetTitleHistoryItem(emptyDocument, 'New title');
	expect(item.document).toEqual({
		content: [],
		title: 'New title',
	});
});

it('set title to document with content', () => {
	const item = new SetTitleHistoryItem(documentWithContent, 'New title');
	expect(item.document).toEqual({
		content: documentWithContent.content,
		title: 'New title',
	});
});
