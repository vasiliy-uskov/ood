import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

class ChocolateSlices extends BeverageDecorator {
	constructor(quantity: number, beverage: IBeverage) {
		if (quantity > 5 || quantity <= 0) {
			throw new Error('Can add only 1 to 5 slices of chocolate\n');
		}
		super(beverage);
		this._quantity = quantity;
	}

	protected _getCondimentCost(): number {
		return this._quantity * 10;
	}

	protected _getCondimentDescription(): string {
		return `chocolate slices x${this._quantity}`;
	}

	private readonly _quantity: number;
}

export {ChocolateSlices};