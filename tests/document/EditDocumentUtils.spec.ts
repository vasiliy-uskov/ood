import {deleteItem, insertItem, modifyItem} from "../../src/model/EditDocumentUtils";
import {createParagraph, documentWithContent, emptyDocument} from "./DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";

describe('insertItem', () => {
	describe('return new document with inserted item in content, when', () => {
		it('document is empty', () => {
			const item = DocumentItem.fromParagraph(createParagraph('A'));
			const result = insertItem(emptyDocument, item, 0);
			expect(result).toEqual({
				...emptyDocument,
				content: [item],
			})
		});
		it('document has content', () => {
			const item = DocumentItem.fromParagraph(createParagraph('A'));
			expect(insertItem(documentWithContent, item, documentWithContent.content.length)).toEqual({
				...emptyDocument,
				content: [
					...documentWithContent.content,
					item
				],
			});
			expect(insertItem(documentWithContent, item, 0)).toEqual({
				...emptyDocument,
				content: [
					item,
					...documentWithContent.content,
				],
			});
			expect(insertItem(documentWithContent, item, 1)).toEqual({
				...emptyDocument,
				content: [
					documentWithContent.content[0],
					item,
					documentWithContent.content[1],
					documentWithContent.content[2],
					documentWithContent.content[3],
				],
			});
		})
	});


	it('return null, when try to insert item in invalid index', () => {
		expect(insertItem(documentWithContent, DocumentItem.fromParagraph(createParagraph('Item')), 5)).toBe(null);
		expect(insertItem(documentWithContent, DocumentItem.fromParagraph(createParagraph('Item')), -1)).toBe(null);
	})
});

describe('deleteItem', () => {
	it('return new document without element placed on index', () => {
		expect(deleteItem(documentWithContent, 3)).toEqual({
			...emptyDocument,
			content: [
				documentWithContent.content[0],
				documentWithContent.content[1],
				documentWithContent.content[2],
			],
		});
		expect(deleteItem(documentWithContent, 0)).toEqual({
			...emptyDocument,
			content: [
				documentWithContent.content[1],
				documentWithContent.content[2],
				documentWithContent.content[3],
			],
		});
		expect(deleteItem(documentWithContent, 2)).toEqual({
			...emptyDocument,
			content: [
				documentWithContent.content[0],
				documentWithContent.content[1],
				documentWithContent.content[3],
			],
		});
	});


	it('return null, when try to delete item in invalid index', () => {
		expect(deleteItem(emptyDocument, 0)).toBe(null);
		expect(deleteItem(emptyDocument, -1)).toBe(null);
		expect(deleteItem(emptyDocument, 1)).toBe(null);
		expect(deleteItem(documentWithContent, -1)).toBe(null);
		expect(deleteItem(documentWithContent, documentWithContent.content.length)).toBe(null);
		expect(deleteItem(documentWithContent, documentWithContent.content.length + 1)).toBe(null);
	})
});

describe('modifyItem', () => {
	it('return new document with new element placed on index', () => {
		const item = DocumentItem.fromParagraph(createParagraph('Item'));
		expect(modifyItem(documentWithContent, 3, () => item)).toEqual({
			...emptyDocument,
			content: [
				documentWithContent.content[0],
				documentWithContent.content[1],
				documentWithContent.content[2],
				item,
			],
		});
		expect(modifyItem(documentWithContent, 0, () => item)).toEqual({
			...emptyDocument,
			content: [
				item,
				documentWithContent.content[1],
				documentWithContent.content[2],
				documentWithContent.content[3],
			],
		});
		expect(modifyItem(documentWithContent, 2, () => item)).toEqual({
			...emptyDocument,
			content: [
				documentWithContent.content[0],
				documentWithContent.content[1],
				item,
				documentWithContent.content[3],
			],
		});
	});


	it('return null, when try to delete item in invalid index', () => {
		expect(deleteItem(emptyDocument, 0)).toBe(null);
		expect(deleteItem(emptyDocument, -1)).toBe(null);
		expect(deleteItem(emptyDocument, 1)).toBe(null);
		expect(deleteItem(documentWithContent, -1)).toBe(null);
		expect(deleteItem(documentWithContent, documentWithContent.content.length)).toBe(null);
		expect(deleteItem(documentWithContent, documentWithContent.content.length + 1)).toBe(null);
	})
});