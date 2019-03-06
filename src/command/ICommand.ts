interface ICommand {
	is(command: string): boolean;
	help(): string;
	execute(args: string): void;
}

export {ICommand}