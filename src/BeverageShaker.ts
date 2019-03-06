import {Order} from "./Order";
import {ICommand} from "./command/ICommand";
import {AddBeverage} from "./command/AddBeverage";
import {AddCondiment} from "./command/AddCondiment";
import {Pay} from "./command/Pay";

class BeverageShaker {
	process(commandStr: string) {
		for (const command of this._commands) {
			if (command.is(commandStr)) {
				command.execute(commandStr);
				return;
			}
		}
		throw new Error(`Unexpected command. Try:
${this._commands.map(command => command.help()).join('')}`)
	}

	getOrderDescription(): string {
		return this._order.getDescription();
	}

	private _order = new Order();
	private _commands: Array<ICommand> = [
		new AddBeverage(this._order),
		new AddCondiment(this._order),
		new Pay(this._order),
	]
}

export {BeverageShaker};