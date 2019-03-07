import {IBeverage} from "./IBeverage";

enum TeaType {
	green = 'Green',
	black = 'Black',
	herbal = 'Herbal',
	brew = 'Brew',
}

class Tea implements IBeverage {
	constructor(type: TeaType) {
		this._type = type;
	}

	getCost(): number {
		return 30
	}

	getDescription(): string {
		return `${this._type} tea`;
	}

	private readonly _type: TeaType;
}

export {
	Tea,
	TeaType
}