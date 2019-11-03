import {ICommand} from "./ICommand";

export class CommandExecutor {
	constructor(commands: Array<ICommand>) {
		this._commands = commands.slice();
	}

	execute(commandStr: string) {
		const command = this._commands.find((command) => command.is(commandStr));
		if (!command)
		{
			console.log('Undefined command.');
		}
		else
		{
			try
			{
				command.execute(commandStr);
			}
			catch (e) {
				console.log(e);
			}
		}
	}

	private readonly _commands: Array<ICommand>;
}
