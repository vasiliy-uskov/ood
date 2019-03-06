import {IBeverage} from "./IBeverage";

class Tea implements IBeverage {
	getCoast(): number {
		return 30
	}
	getDescription(): string {
		return 'Tea'
	}
}

export {Tea}