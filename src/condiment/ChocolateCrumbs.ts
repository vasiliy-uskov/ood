import {BeverageDecorator} from "./BeverageDecorator";
import {IBeverage} from "../beverage/IBeverage";

class ChocolateCrumbs extends BeverageDecorator {
	constructor(mass: number, beverage: IBeverage) {
		super(beverage);
		this._mass = mass;
	}

	protected _getCondimentCost(): number {
		return this._mass * 2;
	}

	protected _getCondimentDescription(): string {
		return `chocolate crumbs ${this._mass}g`;
	}

	private readonly _mass: number;
}

export {ChocolateCrumbs}