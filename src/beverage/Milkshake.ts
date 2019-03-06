import {IBeverage} from "./IBeverage";

class Milkshake implements IBeverage {
	getCoast(): number {
		return 80
	}
	getDescription(): string {
		return 'Milkshake'
	}
}

export {Milkshake}