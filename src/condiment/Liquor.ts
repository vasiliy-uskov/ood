import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

enum LiquorType {
	nuts = 'nuts',
	chocolate = 'chocolate',
}

class Liquor extends BeverageDecorator {
	constructor(type: LiquorType, beverage: IBeverage) {
		super(beverage);
		this._type = type;
	}

	protected _getCondimentCost(): number {
		return 50;
	}

	protected _getCondimentDescription(): string {
		return `${this._type} liquor`;
	}

	private readonly _type: LiquorType;
}

export {
	Liquor,
	LiquorType
}