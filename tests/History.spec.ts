import {History} from "../src/history/History";
import {createDocument, createParagraph, emptyDocument} from "./document/DocumentData";
import {generateUUId} from "../src/utils/utils";
import {DocumentItem} from "../src/model/DocumentItem";


class MockHistoryItem {
	public commit = jest.fn();
	public dispose = jest.fn();
	public document = createDocument([
		DocumentItem.fromParagraph(createParagraph(generateUUId())),
	]);
}

it('hold empty document on create', () => {
	const history = new History();
	expect(history.currentDocument()).toEqual(emptyDocument);
});

it('can add item to history', () => {
	const history = new History();
	const mockItem = new MockHistoryItem();
	history.add(mockItem);
	expect(history.currentDocument()).toEqual(mockItem.document);
});

it('can undo', () => {
	const history = new History();
	const mockItem = new MockHistoryItem();
	history.add(mockItem);
	history.undo();
	expect(history.currentDocument()).toEqual(emptyDocument);
});

it('can redo', () => {
	const history = new History();
	const mockItem = new MockHistoryItem();
	history.add(mockItem);
	history.undo();
	history.redo();
	expect(history.currentDocument()).toEqual(mockItem.document);
});

it('rewrite history on add item after undo', () => {
	const history = new History();
	const firstMockItem = new MockHistoryItem();
	const secondMockItem = new MockHistoryItem();
	history.add(firstMockItem);
	history.undo();
	history.add(secondMockItem);
	expect(history.currentDocument()).toEqual(secondMockItem.document);
	history.redo();
	expect(history.currentDocument()).toEqual(secondMockItem.document);
});

it('has limited depth', () => {
	const history = new History();
	const mockItem = new MockHistoryItem();
	history.add(mockItem);
	for (let i = 0; i < History.HISTORY_MAX_LENGTH - 1; ++i)
	{
		history.add(new MockHistoryItem());
	}
	for (let i = 0; i < History.HISTORY_MAX_LENGTH - 1; ++i)
	{
		history.undo();
	}
	history.undo();
	expect(history.currentDocument()).toEqual(mockItem.document);
	history.undo();
	expect(history.currentDocument()).toEqual(mockItem.document);
});