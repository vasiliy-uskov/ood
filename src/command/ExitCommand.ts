export class ExitCommand {
	is(command: string): boolean {
		return !!command.match(/^Exit$/);
	}

	execute() {
		process.exit(0);
	}

	help(): string {
		return 'Exit';
	}
}

