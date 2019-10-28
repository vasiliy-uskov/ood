import {Size} from "../../utils/Size";
import {IReadonlyResource, IResource} from "../resource/IResource";

export class Image {
	public readonly size: Size;
	public readonly img: IResource;
}

export class ReadonlyImage {
	public readonly size: Size;
	public readonly img: IReadonlyResource;
}