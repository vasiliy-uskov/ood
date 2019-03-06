import {IBeverage} from "./IBeverage";

class Latte implements IBeverage {
	getCoast(): number {
		return 90
	}
	getDescription(): string {
		return 'Latte'
	}
}

export {Latte}