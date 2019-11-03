import {escapeHtmlText} from "../../utils/utils";

export type ParagraphProps = {
	readonly text: string
};

export function Paragraph(props: ParagraphProps) {
	return `<p>${escapeHtmlText(props.text)}</p>`
}