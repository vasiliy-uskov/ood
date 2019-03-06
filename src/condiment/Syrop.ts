import {ICondiment} from "./ICondiment";

enum SyrupType {
	chocolate = 'Chocolate',
	maple = 'Maple',
}

class Syrup implements ICondiment {
	constructor(type: SyrupType) {
		this._type = type;
	}

	getCoast(): number {
		return 15;
	}

	getDescription(): string {
		return `${this._type} syrup`;
	}

	private readonly _type: SyrupType;
}

export {
	Syrup,
	SyrupType
}