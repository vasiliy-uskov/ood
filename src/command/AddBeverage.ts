import {Capuccino} from "../beverage/Capuccino";
import {Espresso} from "../beverage/Espresso";
import {Latte} from "../beverage/Latte";
import {Milkshake} from "../beverage/Milkshake";
import {Tea} from "../beverage/Tea";
import {IBeverage} from "../beverage/IBeverage";
import {Order} from "../Order";
import {ICommand} from "./ICommand";

const BeveragesTypes: {[key:string]: () => IBeverage} = {
	'capuccino': () => new Capuccino(),
	'espresso': () => new Espresso(),
	'latte': () => new Latte(),
	'milkshake': () => new Milkshake(),
	'tea': () => new Tea(),
};

class AddBeverage implements ICommand {
	constructor(order: Order) {
		this._order = order;
	}

	execute(command: string) {
		const matchResult = command.toLowerCase().match(/make (\w+)/);
		if (matchResult) {
			const type = matchResult[1];
			if (BeveragesTypes[type]) {
				this._order.addBeverage(BeveragesTypes[type]());
				return;
			}
		}
		throw new Error(`Wrong command!\nTry: ${this.help()}`)
	}

	help(): string {
		return `make <${this._getBeverageTypes()}>\n`
	}

	is(command: string): boolean {
		return !!command.toLowerCase().match(/make.*/)
	}

	private _getBeverageTypes(): string {
		return Object.keys(BeveragesTypes).join('|');
	}

	private readonly _order: Order;
}

export {AddBeverage}