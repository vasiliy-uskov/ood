import {IBeverage} from "./IBeverage";
import {PortionSize} from "./PortionSize";

class Milkshake implements IBeverage {
	constructor(portionSize: PortionSize) {
		this._portionSize = portionSize;
	}

	getCost(): number {
		switch (this._portionSize) {
			case PortionSize.small:
				return 50;
			case PortionSize.middle:
				return 60;
			case PortionSize.large:
				return 80;
		}
	}

	getDescription(): string {
		return `${this._portionSize} milkshake`;
	}

	private readonly _portionSize: PortionSize;
}

export {Milkshake}