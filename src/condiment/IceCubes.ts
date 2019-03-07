import {IBeverage} from "../beverage/IBeverage";
import {BeverageDecorator} from "./BeverageDecorator";

enum IceCubesType {
	dry = 'dry',
	water = 'water',
}

class IceCubes extends BeverageDecorator {
	constructor(quantity: number, type: IceCubesType, beverage: IBeverage) {
		super(beverage);
		this._quantity = quantity;
		this._type = type;
	}

	protected _getCondimentCost(): number {
		return this._quantity * (this._type == IceCubesType.dry ? 10 : 5);
	}

	protected _getCondimentDescription(): string {
		return `${this._type} ice cubes x${this._quantity}`;
	}

	private readonly _quantity: number;
	private readonly _type: IceCubesType;
}

export {
	IceCubes,
	IceCubesType
}