import {ReadonlyDocument} from "../model/Document";
import {ReadonlyImage} from "../model/element/Image";
import {Paragraph} from "../model/element/Paragraph";
import {writeFileSync} from "fs";
import {join, relative} from "path";

const DOCUMENT_FILE_NAME = 'index.html';
const IMAGES_DIR_NAME = 'images';

export class HTMLDocumentSaver {
	public static save(location: string, document: ReadonlyDocument): void {
		const imagesPath = join(location, IMAGES_DIR_NAME);
		const destIndexPath = join(location, DOCUMENT_FILE_NAME);
		writeFileSync(destIndexPath, this._expandDocument(document, location, imagesPath))
	}

	private static _expandDocument(document: ReadonlyDocument, destPath: string, imagesPath: string): string {
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
				return this._expandImage(image, destPath, imagesPath);
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

	private static _expandParagraph(paragraph: Paragraph) {
		return `<p>${this._escapeText(paragraph.text)}</p>`;
	}

	private static _expandImage(image: ReadonlyImage, destPath: string, imagesPath: string): string {
		const src = relative(destPath, image.img.save(imagesPath));
		return `<img
					src="${src}"
					width="${image.size.width}"
					height="${image.size.height}"
					alt=""
				/>`
	}

	private static _escapeText(text: string) {
		return text
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
	}
}