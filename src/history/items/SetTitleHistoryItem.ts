import {Document} from "../../model/Document";
import {IHistoryItem} from "./IHistoryItem";

export class SetTitleHistoryItem implements IHistoryItem {
	constructor(document: Document, title: string) {
		this.document = {
			...document,
			title,
		}
	}

	commit(): void {}

	dispose(): void {}

	public readonly document: Document;
}