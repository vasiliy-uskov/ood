export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min)
}

export function generateUUIDv4(): string {
	let uuid = "";
	for (let i = 0; i < 16; ++i) {
		uuid = uuid.concat(randomInt(0, 255).toString(16))
	}
	return uuid;
}

export function generateDuplicatesBytes(byteValue: number, bytesCount: number): Array<number> {
	const bytes = [];
	for (let i = 0; i < bytesCount; ++i) {
		bytes.push(byteValue)
	}
	return bytes;
}