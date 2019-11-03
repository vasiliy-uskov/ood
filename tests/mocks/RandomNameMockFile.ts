import {IReadonlyResource, IResource} from "../../src/model/resource/IResource";
import {generateUUId} from "../../src/utils/utils";

export class RandomNameMockFile implements IResource, IReadonlyResource {
	srcFileName(): string {
		return this._fileName;
	}

	public dispose = jest.fn();
	public save = jest.fn(() => this._fileName);

	private readonly _fileName = `${generateUUId()}.mock`;
}