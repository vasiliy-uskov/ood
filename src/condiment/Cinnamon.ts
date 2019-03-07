import {BeverageDecorator} from "./BeverageDecorator";
class Cinnamon extends BeverageDecorator {
	protected _getCondimentCost(): number {
		return 20;
	}

	protected _getCondimentDescription(): string {
		return `cinnamon`;
	}
}

export {Cinnamon}