import {Order} from "../Order";
import {ICommand} from "./ICommand";

class Pay implements ICommand {
	constructor(order: Order) {
		this._order = order;
	}

	execute(command: string): void {
		const matchResult = command.toLowerCase().match(/pay\s+(([0-9])+)/);
		if (!matchResult || isNaN(+matchResult[1])) {
			throw new Error(`Wrong command! Try: \n${this.help()}`);
		}
		const payed = this._order.pay(+matchResult[1]);
		if (!payed) {
			throw new Error(`Not enough money. You need ${this._order.getCost()}`)
		}
	}

	help(): string {
		return 'pay <money>\n'
	}

	is(command: string): boolean {
		return !!command.toLowerCase().match(/pay.*/)
	}

	private readonly _order: Order;
}


export {Pay}