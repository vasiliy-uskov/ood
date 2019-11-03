import {createDocument, createParagraph} from "./DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";
import {generateUUId} from "../../src/utils/utils";

export class MockHistoryItem {
	public commit = jest.fn();
	public dispose = jest.fn();
	public document = createDocument([
		DocumentItem.fromParagraph(createParagraph(generateUUId())),
	]);
}