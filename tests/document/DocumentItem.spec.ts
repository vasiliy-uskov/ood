import {DocumentItem} from "../../src/model/DocumentItem";
import {createImage, createParagraph} from "../mocks/DocumentData";

it('hold image if it was created by image', () => {
	const image = createImage({
		width: 10,
		height: 10,
	});
	const documentItem = DocumentItem.fromImage(image);
	expect(documentItem.toImage()).toBe(image);
	expect(documentItem.toParagraph()).toBe(null);
});
it('hold paragraph if it was created by paragraph', () => {
	const paragraph = createParagraph('SomeText');
	const documentItem = DocumentItem.fromParagraph(paragraph);
	expect(documentItem.toParagraph()).toBe(paragraph);
	expect(documentItem.toImage()).toBe(null);
});