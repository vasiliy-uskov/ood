import {ICondiment} from "./ICondiment";

class Lemon implements ICondiment {
	constructor(quantity: number) {
		this._quantity = quantity;
	}

	getCoast(): number {
		return this._quantity * 10;
	}

	getDescription(): string {
		return `lemon x${this._quantity}`;
	}

	private readonly _quantity: number;
}

export {Lemon}