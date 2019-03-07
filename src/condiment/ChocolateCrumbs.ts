import {ICondiment} from "./ICondiment";

class ChocolateCrumbs implements ICondiment {
	constructor(mass: number) {
		this._mass = mass;
	}

	getCoast(): number {
		return this._mass * 2;
	}

	getDescription(): string {
		return `chocolate crumbs ${this._mass}g`;
	}

	private readonly _mass: number;
}

export {ChocolateCrumbs}