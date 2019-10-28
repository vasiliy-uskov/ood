export function randomInt(min: number, max: number): number {
	return Math.floor(min + (max - min) * Math.random())
}

const ID_BYTES_COUNT = 16;

export function generateUUId(): string {
	let id = '';
	for (let i = 0; i < ID_BYTES_COUNT; ++i) {
		id += randomInt(0, 255).toString(16)
	}
	return id;
}