export interface IResource {
	save(url: string): string;
	srcFileName(): string;
	dispose(): void;
}

export interface IReadonlyResource {
	srcFileName(): string;
	save(url: string): string;
}