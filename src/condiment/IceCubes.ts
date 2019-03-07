import {ICondiment} from "./ICondiment";

enum IceCubesType {
	dry = 'dry',
	water = 'water',
}

class IceCubes implements ICondiment {
	constructor(quantity: number, type: IceCubesType) {
		this._quantity = quantity;
		this._type = type;
	}

	getCoast(): number {
		return this._quantity * (this._type == IceCubesType.dry ? 10 : 5);
	}

	getDescription(): string {
		return `${this._type} ice cubes x${this._quantity}`;
	}

	private readonly _quantity: number;
	private readonly _type: IceCubesType;
}

export {
	IceCubes,
	IceCubesType
}