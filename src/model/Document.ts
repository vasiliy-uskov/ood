import {DocumentItem, ReadonlyDocumentItem} from "./DocumentItem";

export class Document {
	public readonly content: ReadonlyArray<DocumentItem>;
	public readonly title: string;
}

export class ReadonlyDocument {
	public readonly content: ReadonlyArray<ReadonlyDocumentItem>;
	public readonly title: string;
}