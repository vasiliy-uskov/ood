import {IBeverage} from "./IBeverage";

class Espresso implements IBeverage {
	getCost(): number {
		return 60
	}

	getDescription(): string {
		return 'Espresso'
	}
}

export {Espresso}