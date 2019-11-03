import {ReadonlyDocument} from "../model/Document";
import {ReadonlyImage} from "../model/element/Image";
import {Paragraph} from "../model/element/Paragraph";

export class DocumentLogger {
	public static log(document: ReadonlyDocument): void {
		this._logDocument(document)
	}

	private static _logDocument(document: ReadonlyDocument) {
		console.log('Title: ', document.title);
		document.content.forEach((item, index) => {
			const image = item.toImage();
			const paragraph = item.toParagraph();
			if (image)
			{
				this._logImage(image, index);
			}
			if (paragraph)
			{
				this._logParagraph(paragraph, index);
			}
		})
	}

	private static _logParagraph(paragraph: Paragraph, index: number) {
		console.log(`${index}. Paragraph: ${paragraph.text}`)
	}

	private static _logImage(image: ReadonlyImage, index: number) {
		console.log(`${index}. Image: ${image.size.width} ${image.size.height} ${image.img.srcFileName()}`)
	}
}