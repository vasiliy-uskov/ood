import {IBeverage} from "../beverage/IBeverage";

abstract class BeverageDecorator implements IBeverage {
	constructor(beverage: IBeverage) {
		this._beverage = beverage;
	}

	getCost(): number {
		return this._beverage.getCost() + this._getCondimentCost();
	}

	getDescription(): string {
		return `${this._beverage.getDescription()} ${this._getCondimentDescription()}`;
	}

	protected abstract _getCondimentDescription(): string;
	protected abstract _getCondimentCost(): number;

	private _beverage: IBeverage;
}

export {BeverageDecorator}