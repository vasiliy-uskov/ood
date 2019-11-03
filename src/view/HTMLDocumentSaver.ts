import {ReadonlyDocument} from "../model/Document";
import {writeFileSync} from "fs";
import {join, relative} from "path";
import {DocumentProps, Document, ContentType, ParagraphDocumentItem, ImageDocumentItem} from "./html_templates/Document";
import {ReadonlyImage} from "../model/element/Image";
import {Paragraph} from "../model/element/Paragraph";

const DOCUMENT_FILE_NAME = 'index.html';
const IMAGES_DIR_NAME = 'images';

export class HTMLDocumentSaver {
	public static save(location: string, document: ReadonlyDocument): void {
		const destIndexPath = join(location, DOCUMENT_FILE_NAME);
		writeFileSync(destIndexPath, Document(this._processResource(document, location)))
	}

	private static _processResource(document: ReadonlyDocument, location: string): DocumentProps {
		return {
			title: document.title,
			content: document.content.map(item => {
				const image = item.toImage();
				const paragraph = item.toParagraph();
				if (image)
				{
					return this._processImage(image, location)
				}
				if (paragraph)
				{
					return this._processParagraph(paragraph);
				}
				throw new Error();
			})
		}
	}

	private static _processImage(image: ReadonlyImage, location: string): ImageDocumentItem {
		const imagesPath = join(location, IMAGES_DIR_NAME);
		const src = relative(location, image.img.save(imagesPath));
		return {
			type: ContentType.IMAGE,
			props: {
				size: image.size,
				src,
			}
		};
	}

	private static _processParagraph(paragraph: Paragraph): ParagraphDocumentItem {
		return {
			type: ContentType.PARAGRAPH,
			props: paragraph,
		};
	}
}