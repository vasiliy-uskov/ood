import {Size} from "./utils/Size";
import {ReadonlyDocument} from "./model/Document";

export interface IEditor {
	document(): ReadonlyDocument;

	undo(): void;

	redo(): void;

	insertParagraph(text: string, position: number|undefined): void;

	replaceParagraphText(text: string, position: number): void;

	insertImage(size: Size, src: string, position: number|undefined): void;

	resizeImage(size: Size, position: number): void;

	deleteItem(position: number): void;

	setDocumentTitle(title: string): void;
}