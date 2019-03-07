import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

class CoconutFlakes extends BeverageDecorator {
	constructor(mass: number, berverage: IBeverage) {
		super(berverage);
		this._mass = mass;
	}

	protected _getCondimentCost(): number {
		return this._mass;
	}

	protected _getCondimentDescription(): string {
		return `coconut flakes ${this._mass}g`;
	}

	private readonly _mass: number;
}

export {CoconutFlakes}