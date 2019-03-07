import {BeverageDecorator} from "./BeverageDecorator";

class Cream extends BeverageDecorator {
	protected _getCondimentCost(): number {
		return 25
	}

	protected _getCondimentDescription(): string {
		return 'cream';
	}
}

export {Cream}