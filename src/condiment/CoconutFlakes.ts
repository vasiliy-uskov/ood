import {ICondiment} from "./ICondiment";

class CoconutFlakes implements ICondiment {
	constructor(mass: number) {
		this._mass = mass;
	}

	getCoast(): number {
		return this._mass;
	}

	getDescription(): string {
		return `Coconut flakes ${this._mass}g`;
	}

	private readonly _mass: number;
}

export {CoconutFlakes}