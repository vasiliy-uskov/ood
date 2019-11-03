import {escapeHtmlText} from "../../utils/utils";
import {Image, ImageProps} from "./Image";
import {Paragraph, ParagraphProps} from "./Paragraph";

export enum ContentType {
	PARAGRAPH = 'paragraph',
	IMAGE = 'image',
}

export type ParagraphDocumentItem = {
	type: ContentType.PARAGRAPH,
	props: ParagraphProps,
}

export type ImageDocumentItem = {
	type: ContentType.IMAGE,
	props: ImageProps,
}

export type DocumentContent = ReadonlyArray<(ParagraphDocumentItem|ImageDocumentItem)>;

export type DocumentProps = {
	title: string,
	content: DocumentContent,
}

export function Document(props: DocumentProps) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>${escapeHtmlText(props.title)}</title>
</head>
<body>
	${props.content.map(item => {
		switch (item.type) {
			case ContentType.IMAGE:
				return Image(item.props);
			case ContentType.PARAGRAPH:
				return Paragraph(item.props);
			default:
				throw new Error("Undefined content type")
		}
	}).join("")}
</body>
</html>`;
}