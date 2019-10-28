import {DocumentItem} from "./DocumentItem";
import {Document} from "./Document";

export function insertItem(document: Document, item: DocumentItem, position: number): Document|null {
	if (position < 0 || document.content.length < position)
	{
		return null
	}
	const content = document.content.slice();
	content.splice(position, 0, item);
	return {
		...document,
		content,
	}
}

export function deleteItem(document: Document, position: number): Document|null {
	if (!document.content.length || position < 0 || document.content.length <= position)
	{
		return null;
	}
	const content = document.content.slice();
	content.splice(position, 1);
	return {
		...document,
		content
	}
}

export function modifyItem(document: Document, position: number, replaceFn: (item: DocumentItem) => DocumentItem): Document|null {
	if (!document.content.length || position < 0 || document.content.length <= position)
	{
		return null;
	}
	const content = document.content.slice();
	const item = content[position];
	content.splice(position, 1, replaceFn(item));
	return {
		...document,
		content
	}
}