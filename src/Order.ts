import {IBeverage} from "./beverage/IBeverage";
import {ICondiment} from "./condiment/ICondiment";
import {BeverageDecorator} from "./BeverageDecorator";

class Order {
	addBeverage(beverage: IBeverage) {
		this._beverages.push(beverage)
	}

	addCondiment(condiment: ICondiment): void {
		if (!this._beverages.length) {
			throw new Error('No chosen beverage\n')
		}
		this._beverages.push(new BeverageDecorator(this._beverages.pop(), condiment));
	}

	pay(money: number): boolean {
		this._payed = money >= this.getCoast();
		return this._payed;
	}

	getCoast(): number {
		return this._beverages
			.map(beverage => beverage.getCoast())
			.reduce((coast1, coast2) => coast1 + coast2)
	}

	getDescription(): string {
		return this._beverages
			.map(beverage => beverage.getDescription())
			.join('\n') + '\n';
	}

	private _beverages: Array<IBeverage> = [];
	private _payed = false;
}

export {Order}