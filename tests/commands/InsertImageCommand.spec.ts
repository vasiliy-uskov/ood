import {createEditor} from "../mocks/DocumentData";
import {InsertImageCommand} from "../../src/command/InsertImageCommand";

it('return help', () => {
	const command = new InsertImageCommand(createEditor());
	expect(command.help()).toMatchSnapshot();
});

describe('is', () => {
	it('return true if command start by DeleteItem', () => {
		const command = new InsertImageCommand(createEditor());
		expect(command.is('InsertImage 0 100 100 ./img')).toBe(true);
		expect(command.is('InsertImage ')).toBe(true);
		expect(command.is('InsertImage')).toBe(true);
		expect(command.is('DeleteItem')).toBe(false);
		expect(command.is(' InsertImage')).toBe(false);
		expect(command.is(' InsertImag')).toBe(false);
		expect(command.is('')).toBe(false);
	});
});
describe('execute', () => {
	it('call insertImage method if parse parameters', () => {
		const editor = createEditor();
		const command = new InsertImageCommand(editor);
		expect(editor.insertImage).not.toBeCalled();
		command.execute('InsertImage 0 100 200 ./img');
		expect(editor.insertImage).toBeCalledTimes(1);
		expect(editor.insertImage).toBeCalledWith({width: 100, height: 200}, './img', 0);
		command.execute('InsertImage end 100 200 ./img');
		expect(editor.insertImage).toBeCalledTimes(2);
		expect(editor.insertImage).toBeCalledWith({width: 100, height: 200}, './img', undefined);
	});
	it('throw error if do not parse parameters', () => {
		const command = new InsertImageCommand(createEditor());
		expect(() => command.execute('InsertImage aend 100 200 ./img')).toThrow();
		expect(() => command.execute('InsertImage 0ф 100 200 ./img')).toThrow();
		expect(() => command.execute('InsertImage end 100as 200 ./img')).toThrow();
		expect(() => command.execute('InsertImage aend 100 200a ./img')).toThrow();
		expect(() => command.execute('InsertImage aend 100 200 ')).toThrow();
		expect(() => command.execute('InsertImage end 100 200')).toThrow();
		expect(() => command.execute('InsertImage end 100 200 ')).toThrow();
	});
});