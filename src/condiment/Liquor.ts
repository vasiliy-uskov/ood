import {ICondiment} from "./ICondiment";

enum LiquorType {
	nuts = 'nuts',
	chocolate = 'chocolate',
}

class Liquor implements ICondiment {
	constructor(type: LiquorType) {
		this._type = type;
	}

	getCoast(): number {
		return 50;
	}

	getDescription(): string {
		return `${this._type} liquor`;
	}

	private readonly _type: LiquorType;
}

export {
	Liquor,
	LiquorType
}