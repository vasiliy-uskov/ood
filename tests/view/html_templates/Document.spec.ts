import {ContentType, Document, DocumentContent} from "../../../src/view/html_templates/Document";

function expandDocument(title: string, content: DocumentContent) {
	expect(Document({title, content})).toMatchSnapshot();
}

const jsInjectionText = `<script>alert('&nbsp;')</script>`;

it('expand empty paragraph', () => {
	expandDocument('Empty document', []);
});

it('escape js injection', () => {
	expandDocument(jsInjectionText, []);
});

it('expand not empty paragraph', () => {
	expandDocument('Not empty', [
		{
			type: ContentType.PARAGRAPH,
			props: {
				text: jsInjectionText,
			}
		},
		{
			type: ContentType.IMAGE,
			props: {
				src: './location/src.png',
				size: {
					width: 100,
					height: 100,
				}
			}
		}
	]);
});

it('throw error on wrong content type', () => {
	expect(() => Document({
		title: '',
		content: [{
			type: 'Some wrong content type',
		}] as any as DocumentContent
	})).toThrow();
});