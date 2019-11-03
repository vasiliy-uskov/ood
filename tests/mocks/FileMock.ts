import {IReadonlyResource, IResource} from "../../src/model/resource/IResource";
import {generateUUId} from "../../src/utils/utils";

export class StaticNameMockFile implements IResource, IReadonlyResource {
	constructor(fileName: string) {
		this._fileName =`${fileName}.mock`;
	}

	srcFileName(): string {
		return this._fileName;
	}

	public dispose = jest.fn();
	public save = jest.fn(() => this._fileName);

	private readonly _fileName: string;
}

export class RandomNameMockFile extends StaticNameMockFile {
	constructor() {
		super(generateUUId());
	}
}