import {Size} from "../../utils/Size";

export type ImageProps = {
	readonly src: string,
	readonly size: Size
};

export function Image(props: ImageProps) {
	return `<img src="${props.src}" width="${props.size.width}" height="${props.size.height}" alt="" />`;
}