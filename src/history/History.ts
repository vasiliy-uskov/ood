import {Document} from "../model/Document";
import {IHistoryItem} from "./items/IHistoryItem";

export class History {
	currentDocument(): Document {
		return this._history[this._currentElementIndex].document;
	}

	add(item: IHistoryItem) {
		this._cleanHistoryTail();
		if (this._history.length == History.HISTORY_MAX_LENGTH)
		{
			const item = this._history.shift();
			item && item.commit();
		}
		this._history.push(item);
		this._currentElementIndex = this._lastItemIndex();
	}

	undo() {
		if (this._currentElementIndex)
		{
			--this._currentElementIndex;
		}
	}

	redo() {
		if (this._currentElementIndex < this._lastItemIndex())
		{
			this._currentElementIndex++;
		}
	}

	dispose() {
		for (const item of this._history)
		{
			item.dispose();
		}
		this._history = [History.createCleanDocumentHistoryItem()];
		this._currentElementIndex = 0;
	}

	private _lastItemIndex(): number {
		return this._history.length - 1;
	}

	private _cleanHistoryTail() {
		const tail = this._history.slice(this._currentElementIndex + 1, this._history.length);
		this._history = this._history.slice(0, this._currentElementIndex + 1);
		for (const item of tail)
		{
			item.dispose();
		}
	}

	private _currentElementIndex = 0;
	private _history: Array<IHistoryItem> = [History.createCleanDocumentHistoryItem()];

	public static HISTORY_MAX_LENGTH = 10;
	private static createCleanDocumentHistoryItem(): IHistoryItem {
		return {
			document: {
				title: "",
				content: []
			},
			commit(): void {},
			dispose(): void {},
		}
	}
}