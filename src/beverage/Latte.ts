import {IBeverage} from "./IBeverage";
import {Portion} from "./PortionSize";

class Latte implements IBeverage {
	constructor(portion: Portion) {
		this._portionSize = portion;
	}

	getCoast(): number {
		return this._portionSize == Portion.standard ? 90 : 120;
	}

	getDescription(): string {
		return `${this._portionSize} latte`;
	}

	private readonly _portionSize: Portion;
}

export {Latte}