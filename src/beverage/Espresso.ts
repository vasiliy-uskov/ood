import {IBeverage} from "./IBeverage";

class Espresso implements IBeverage {
	getCoast(): number {
		return 60
	}

	getDescription(): string {
		return 'Espresso'
	}
}

export {Espresso}