import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

class Lemon extends BeverageDecorator {
	constructor(quantity: number, beverage: IBeverage) {
		super(beverage);
		this._quantity = quantity;
	}

	protected _getCondimentCost(): number {
		return this._quantity * 10;
	}

	protected _getCondimentDescription(): string {
		return `lemon x${this._quantity}`;
	}

	private readonly _quantity: number;
}

export {Lemon}