import {History} from "./history/History";
import {InsertParagraphHistoryItem} from "./history/items/InsertParagraphHistoryItem";
import {ReplaceParagraphTextHistoryItem} from "./history/items/ReplaceParagraphTextHistoryItem";
import {InsertImageHistoryItem} from "./history/items/InsertImageHistoryItem";
import {File} from "./model/resource/File";
import {Size} from "./utils/Size";
import {ResizeImageHistoryItem} from "./history/items/ResizeImageHistoryItem";
import {DeleteDocumentItemHistoryItem} from "./history/items/DeleteDocumentItemHistoryItem";
import {SetTitleHistoryItem} from "./history/items/SetTitleHistoryItem";
import {IEditor} from "./IEditor";
import {ReadonlyDocument} from "./model/Document";

export class Editor implements IEditor {
	document(): ReadonlyDocument {
		return this._history.currentDocument();
	}

	undo(): void {
		this._history.undo();
	}

	redo(): void {
		this._history.redo();
	}

	insertParagraph(text: string, position: number|undefined): void {
		this._history.add(new InsertParagraphHistoryItem(this._history.currentDocument(), text, position))
	}

	replaceParagraphText(text: string, position: number): void {
		this._history.add(new ReplaceParagraphTextHistoryItem(this._history.currentDocument(), text, position))
	}

	insertImage(size: Size, src: string, position: number|undefined): void {
		const img = new File(src);
		this._history.add(new InsertImageHistoryItem(this._history.currentDocument(), {size, img}, position))
	}

	resizeImage(size: Size, position: number): void {
		this._history.add(new ResizeImageHistoryItem(this._history.currentDocument(), size, position))
	}

	deleteItem(position: number): void {
		this._history.add(new DeleteDocumentItemHistoryItem(this._history.currentDocument(), position))
	}

	setDocumentTitle(title: string): void {
		this._history.add(new SetTitleHistoryItem(this._history.currentDocument(), title))
	}

	dispose(): void {
		this._history.dispose();
	}

	private _history = new History();
}