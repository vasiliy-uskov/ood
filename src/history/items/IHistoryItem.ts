import {Document} from "../../model/Document";

export interface IHistoryItem {
	commit(): void;
	dispose(): void;
	readonly document: Document;
}