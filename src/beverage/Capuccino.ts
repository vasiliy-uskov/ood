import {IBeverage} from "./IBeverage";
import {Portion} from "./PortionSize";

class Capuccino implements IBeverage {
	constructor(portion: Portion) {
		this._portionSize = portion;
	}

	getCost(): number {
		return this._portionSize == Portion.standard ? 80 : 60;
	}

	getDescription(): string {
		return `${this._portionSize} сapuccino'`;
	}

	private readonly _portionSize: Portion;
}

export {Capuccino}