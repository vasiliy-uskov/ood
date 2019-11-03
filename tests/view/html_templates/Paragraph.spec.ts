import {Paragraph} from "../../../src/view/html_templates/Paragraph";

function expandParagraph(text: string) {
	expect(Paragraph({text})).toMatchSnapshot();
}

it('expand empty paragraph', () => {
	expandParagraph('');
});

it('expand not empty paragraph', () => {
	expandParagraph('Some text');
});

it('escape html text', () => {
	expandParagraph(`<p>&nbsp;</p>`);
});