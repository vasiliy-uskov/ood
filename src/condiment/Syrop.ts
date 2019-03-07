import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

enum SyrupType {
	chocolate = 'chocolate',
	maple = 'maple',
}

class Syrup extends BeverageDecorator {
	constructor(type: SyrupType, beverage: IBeverage) {
		super(beverage);
		this._type = type;
	}

	protected _getCondimentCost(): number {
		return 15;
	}

	protected _getCondimentDescription(): string {
		return `${this._type} syrup`;
	}

	private readonly _type: SyrupType;
}

export {
	Syrup,
	SyrupType
}