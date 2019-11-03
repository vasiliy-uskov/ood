import {History} from "../src/history/History";
import {emptyDocument} from "./mocks/DocumentData";
import {MockHistoryItem} from "./mocks/MockHistoryItem";

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

it('dispose all history items on dispose', () => {
	const history = new History();
	const mockItem = new MockHistoryItem();
	history.add(mockItem);
	expect(mockItem.dispose).not.toBeCalled();
	history.dispose();
	expect(mockItem.dispose).toBeCalledTimes(1);
	expect(mockItem.dispose).toBeCalledWith();
});