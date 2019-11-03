import {RandomNameMockFile} from "./RandomNameMockFile";
import {Size} from "../../src/utils/Size";
import {Paragraph} from "../../src/model/element/Paragraph";
import {Image} from "../../src/model/element/Image";
import {DocumentItem} from "../../src/model/DocumentItem";
import {Document} from "../../src/model/Document";
import {IEditor} from "../../src/IEditor";
import {MockEditor} from "./MockEditor";

export function createImage(size: Size): Image {
	return {
		size: size,
		img: new RandomNameMockFile(),
	}
}
export function createParagraph(text: string): Paragraph {
	return {text};
}

export function createDocumentByImage(image: Image): Document {
	return createDocument([DocumentItem.fromImage(image)]);
}
export function createDocument(content: Array<DocumentItem>): Document {
	return {
		title: '',
		content,
	}
}

export function createEditor(document: Document = createDocument([])): IEditor {
	return new MockEditor(document);
}

const documentWithContent = createDocument([
	DocumentItem.fromParagraph(createParagraph('Item 1')),
	DocumentItem.fromParagraph(createParagraph('Item 2')),
	DocumentItem.fromParagraph(createParagraph('Item 3')),
	DocumentItem.fromParagraph(createParagraph('Item 4')),
]);


const emptyDocument: Document = {
	title: '',
	content: [],
};

export {
	emptyDocument,
	documentWithContent
};
