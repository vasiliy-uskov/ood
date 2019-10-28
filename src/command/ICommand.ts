export interface ICommand {
	execute(command: string): void;
	is(command: string): boolean;
	help(): string;
}