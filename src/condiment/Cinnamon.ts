import {ICondiment} from "./ICondiment";

class Cinnamon implements ICondiment {
	getCoast(): number {
		return 20;
	}

	getDescription(): string {
		return `Cinnamon`;
	}
}

export {Cinnamon}