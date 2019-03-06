import {IBeverage} from "./beverage/IBeverage";
import {ICondiment} from "./condiment/ICondiment";

class BeverageDecorator implements IBeverage {
	constructor(beverage: IBeverage, condiment: ICondiment) {
		this._beverage = beverage;
		this._condiment = condiment;
	}

	getCoast(): number {
		return this._beverage.getCoast() + this._condiment.getCoast();
	}

	getDescription(): string {
		return `${this._beverage.getDescription()} ${this._condiment.getDescription()}`;
	}

	private _beverage: IBeverage;
	private _condiment: ICondiment;
}

export {BeverageDecorator}