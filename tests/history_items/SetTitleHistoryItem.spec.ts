import {SetTitleHistoryItem} from "../../src/history/items/SetTitleHistoryItem";
import {documentWithContent, emptyDocument} from "../mocks/DocumentData";

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

it('do noting on commit', () => {
	const item = new SetTitleHistoryItem(documentWithContent, 'New title');
	item.commit();
});

it('do noting on dispose', () => {
	const item = new SetTitleHistoryItem(documentWithContent, 'New title');
	item.dispose();
});

