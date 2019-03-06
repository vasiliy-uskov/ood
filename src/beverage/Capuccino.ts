import {IBeverage} from "./IBeverage";

class Capuccino implements IBeverage {
	getCoast(): number {
		return 60
	}
	getDescription(): string {
		return 'Capuccino'
	}
}

export {Capuccino}