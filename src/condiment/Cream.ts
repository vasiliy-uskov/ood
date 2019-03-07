import {ICondiment} from "./ICondiment";

class Cream implements ICondiment{
	getCoast(): number {
		return 25
	}
	getDescription(): string {
		return 'cream';
	}
}

export {Cream}