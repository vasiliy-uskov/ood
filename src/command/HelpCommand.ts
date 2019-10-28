export class HelpCommand {
	constructor(commands: Array<{help: () => string}>) {
		this._commands = commands;
	}

	is(command: string): boolean {
		return !!command.match(/^Help$/);
	}

	execute() {
		console.log(`Доступныу команды:\n\t${this._commands.map(command => command.help()).join('\n\t')}\n`);
	}

	help(): string {
		return 'Help';
	}
	private _commands: Array<{help: () => string}>;
}

