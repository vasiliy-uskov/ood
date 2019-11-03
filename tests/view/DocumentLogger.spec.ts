import {DocumentLogger} from "../../src/view/DocumentLogger";
import {createParagraph, createStaticNameImage} from "../mocks/DocumentData";
import {DocumentItem} from "../../src/model/DocumentItem";
import {ConsoleLogMock} from "../mocks/ConsoleLogMock";
import {ReadonlyDocument} from "../../src/model/Document";

function logDocument(document: ReadonlyDocument) {
	ConsoleLogMock.startMock();
	DocumentLogger.log(document);
	expect(ConsoleLogMock.result()).toMatchSnapshot();
	ConsoleLogMock.stopMock();
}

it('log document with content', () => {
	logDocument({
		title: 'Some title',
		content: [
			DocumentItem.fromParagraph(createParagraph('Some text')),
			DocumentItem.fromImage(createStaticNameImage('some_image', {
				width: 100,
				height: 100,
			}))
		]
	});
});

it('log document with title and without content', () => {
	logDocument({
		title: 'Some title',
		content: []
	});
});

it('log empty document', () => {
	logDocument({
		title: '',
		content: []
	});
});