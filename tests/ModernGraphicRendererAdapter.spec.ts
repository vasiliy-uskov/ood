import {ModernGraphicRendererAdapter} from "../src/ModernGraphicRendererAdapter";

class MockOutputStream {
	print(str: string) {
		this.content = this.content + '\n' + str;
	}

	public content = '';
}

function creatAdapter(): {adapter: ModernGraphicRendererAdapter, mockStream: {readonly content: string}} {
	const mockStream = new MockOutputStream();
	const adapter = new ModernGraphicRendererAdapter(str => mockStream.print(str));
	return {
		mockStream,
		adapter,
	}
}

it('do not draw empty object, if call close without line', () => {
	const {mockStream, adapter} = creatAdapter();
	adapter.close();
	expect(mockStream.content).toMatchSnapshot();
});

it('can draw lines', () => {
	const {mockStream, adapter} = creatAdapter();
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	adapter.close();
	expect(mockStream.content).toMatchSnapshot();
});

it('throw exception on lineTo call without start point', () => {
	const {adapter} = creatAdapter();
	expect(() => adapter.lineTo(1, 1)).toThrow();
});

it('start new draw object on moveTo', () => {
	const {mockStream, adapter} = creatAdapter();
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	adapter.close();
	expect(mockStream.content).toMatchSnapshot();
});


it('start new draw object on close', () => {
	const {mockStream, adapter} = creatAdapter();
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	adapter.close();
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	expect(mockStream.content).toMatchSnapshot();
});

it('can set color for a lines', () => {
	const {mockStream, adapter} = creatAdapter();
	adapter.setColor(0xFF0000);
	adapter.moveTo(0, 0);
	adapter.lineTo(1, 1);
	adapter.close();
	expect(mockStream.content).toMatchSnapshot();
});