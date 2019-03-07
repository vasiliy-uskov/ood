import {ICondiment} from "./ICondiment";

class ChocolateSlices implements ICondiment {
	constructor(quantity: number) {
		if (quantity > 5 || quantity <= 0) {
			throw new Error('Can add only 1 to 5 slices of chocolate\n');
		}
		this._quantity = quantity;
	}

	getCoast(): number {
		return this._quantity * 10;
	}

	getDescription(): string {
		return `chocolate slices x${this._quantity}`;
	}

	private readonly _quantity: number;
}

export {ChocolateSlices};