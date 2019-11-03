import {File} from "../../src/model/resource/File";
import {rmdirSync, readdirSync, readFileSync, unlinkSync, existsSync} from "fs";
import {join} from "path";

function rmDir(dir: string): void {
	const items = readdirSync(dir);
	for (const item of items)
	{
		unlinkSync(join(dir, item));
	}
	rmdirSync(join(dir))
}

function checkFileEqual(src: string, dest: string) {
	const sourceFile = readFileSync(src);
	const destFile = readFileSync(dest);
	expect(destFile).toEqual(sourceFile);
}

it('save resource to temp file', () => {
	const src = join(__dirname, "input1.txt");
	const file = new File(src);
	const dest = `./temp/${file.destFileName()}`;
	expect(existsSync(dest)).toBe(true);
	checkFileEqual(src, dest);
	rmDir('./temp');
});

it('remove temp file when dispose', () => {
	const src = join(__dirname, "input1.txt");
	const file = new File(src);
	const dest = `./temp/${file.destFileName()}`;
	expect(existsSync(dest)).toBe(true);
	file.dispose();
	expect(existsSync(dest)).toBe(false);
	expect(existsSync('./temp/')).toBe(false);
});

it('can be saved in dir', () => {
	const src = join(__dirname, "input1.txt");
	const file = new File(src);
	const dest = file.save(__dirname);
	checkFileEqual(src, dest);
	unlinkSync(dest);
	file.dispose();
});

it('can return source path', () => {
	const src = join(__dirname, "input1.txt");
	const file = new File(src);
	expect(file.srcFileName()).toBe(src);
	file.dispose();
});