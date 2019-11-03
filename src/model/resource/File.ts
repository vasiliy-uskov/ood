import {copyFileSync, readdirSync, existsSync, mkdirSync, unlinkSync, rmdirSync} from 'fs';
import {join, parse} from 'path';
import {IReadonlyResource, IResource} from "./IResource";
import {generateUUId} from "../../utils/utils";

const TEMP_FILE_DIR = './temp';

export class File implements IResource, IReadonlyResource {
	constructor(src: string) {
		const fileData = parse(src);
		this._destFileName = `${generateUUId()}${fileData.ext}`;
		this._srcFileName = src;
		File._createTempDir();
		copyFileSync(src, join(TEMP_FILE_DIR, this._destFileName))
	}

	srcFileName(): string {
		return this._srcFileName;
	}

	destFileName(): string {
		return this._destFileName;
	}

	save(url: string): string {
		const dest = join(url, this._destFileName);
		copyFileSync(join(TEMP_FILE_DIR, this._destFileName), dest);
		return dest;
	}

	dispose(): void {
		unlinkSync(join(TEMP_FILE_DIR, this._destFileName));
		const items = readdirSync(TEMP_FILE_DIR);
		if (!items.length)
		{
			rmdirSync(TEMP_FILE_DIR);
		}
	}

	private static _createTempDir(): void {
		if (!existsSync(TEMP_FILE_DIR))
		{
			mkdirSync(TEMP_FILE_DIR);
		}
	}

	private readonly _destFileName: string;
	private readonly _srcFileName: string;
}