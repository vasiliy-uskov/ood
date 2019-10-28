import {ReadonlyDocument} from "../model/Document";
import {ReadonlyImage} from "../model/element/Image";
import {Paragraph} from "../model/element/Paragraph";
import {writeFileSync} from "fs";
import {join, relative} from "path";

const DOCUMENT_FILE_NAME = 'index.html';
const IMAGES_DIR_NAME = 'images';

export class HTMLDocumentView {
	constructor(destPath: string) {
		this._destPath = destPath;
		this._imagesPath = join(this._destPath, IMAGES_DIR_NAME);
	}

	draw(document: ReadonlyDocument): void {
		writeFileSync(
			join(this._destPath, DOCUMENT_FILE_NAME),
			this._expandDocument(document)
		)
	}

	private _expandDocument(document: ReadonlyDocument): string {
		return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>${this._escapeText(document.title)}</title>
</head>
<body>
	${document.content.map(item => {
			const image = item.toImage();
			const paragraph = item.toParagraph();
			if (image)
			{
				return this._expandImage(image);
			}
			if (paragraph)
			{
				return this._expandParagraph(paragraph);
			}
			return '';
	}).join('')}
</body>
</html>`;
	}

	private _expandParagraph(paragraph: Paragraph) {
		return `<p>${this._escapeText(paragraph.text)}</p>`;
	}

	private _expandImage(image: ReadonlyImage): string {
		const src = relative(this._destPath, image.img.save(this._imagesPath));
		return `<img
					src="${src}"
					width="${image.size.width}"
					height="${image.size.height}"
					alt=""
				/>`
	}

	private _escapeText(text: string) {
		return text
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
	}

	private readonly _destPath: string;
	private readonly _imagesPath: string;
}