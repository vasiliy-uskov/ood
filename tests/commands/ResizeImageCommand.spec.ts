import {createEditor} from "../mocks/DocumentData";
import {ResizeImageCommand} from "../../src/command/ResizeImageCommand";

it('return help', () => {
	const command = new ResizeImageCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new ResizeImageCommand(createEditor());
		expect(command.is('ResizeImage 0 100 100 ./img')).toBe(true);
		expect(command.is('ResizeImage ')).toBe(true);
		expect(command.is('ResizeImage')).toBe(true);
		expect(command.is('DeleteItem')).toBe(false);
		expect(command.is('ResizeImag')).toBe(false);
		expect(command.is('resizeImag')).toBe(false);
		expect(command.is(' ResizeImage')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call resizeImage method if parse parameters', () => {
		const editor = createEditor();
		const command = new ResizeImageCommand(editor);
		expect(editor.resizeImage).not.toBeCalled();
		command.execute('ResizeImage 0 100 200');
		expect(editor.resizeImage).toBeCalledTimes(1);
		expect(editor.resizeImage).toBeCalledWith({width: 100, height: 200}, 0);
	});
	it('throw error if do not parse parameters', () => {
		const command = new ResizeImageCommand(createEditor());
		expect(() => command.execute('ResizeImage 0ф 100 200')).toThrow();
		expect(() => command.execute('ResizeImage 0 100a 200')).toThrow();
		expect(() => command.execute('ResizeImage 0 100 200a')).toThrow();
		expect(() => command.execute('ResizeImage end 100 200')).toThrow();
		expect(() => command.execute('ResizeImage aend 100 200')).toThrow();
		expect(() => command.execute('ResizeImage end 100as 200')).toThrow();
		expect(() => command.execute('ResizeImage aend 100 200a')).toThrow();
		expect(() => command.execute('ResizeImage aend 100 200')).toThrow();
	});
});