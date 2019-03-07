import {IBeverage} from "./beverage/IBeverage";

class Order {
	addBeverage(beverage: IBeverage) {
		this._beverages.push(beverage)
	}

	popLastBeverage(): IBeverage {
		if (!this._beverages.length) {
			throw new Error('No chosen beverage\n')
		}
		return this._beverages.pop()
	}

	pay(money: number): boolean {
		this._paid = money >= this.getCost();
		return this._paid;
	}

	getCost(): number {
		return this._beverages
			.map(beverage => beverage.getCost())
			.reduce((cost1, cost2) => cost1 + cost2)
	}

	getDescription(): string {
		return this._beverages
				.map(beverage => beverage.getDescription())
				.join('\n') + '\n';
	}

	private _beverages: Array<IBeverage> = [];
	private _paid = false;
}

export {Order}