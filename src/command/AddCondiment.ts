import {Order} from "../Order";
import {ICommand} from "./ICommand";
import {
	ChocolateCrumbsCreator,
	ChocolateSlicesCreator,
	CinnamonCreator,
	CoconutFlakesCreator,
	CreamCreator,
	IceCubesCreator,
	ICondimentCreator,
	LemonCreator, LiquorCreator,
	SyrupCreator
} from "./condiments/CondimentsCreators";

const condimentCreators: Array<Readonly<ICondimentCreator>> = [
	new ChocolateCrumbsCreator(),
	new CinnamonCreator(),
	new CoconutFlakesCreator(),
	new LemonCreator(),
	new IceCubesCreator(),
	new SyrupCreator(),
	new LiquorCreator(),
	new ChocolateSlicesCreator(),
	new CreamCreator(),
];

class AddCondiment implements ICommand {
	constructor(order: Order) {
		this._order = order;
	}

	execute(command: string): void {
		const matchResult = command.toLowerCase().match(/add (([a-z]|\s)+)(: (.*))?$/);
		if (matchResult) {
			const condiment = matchResult[1];
			const args = matchResult[3];
			for (const creator of condimentCreators) {
				if (creator.is(condiment)) {
					this._order.addCondiment(creator.create(args));
					return
				}
			}
		}
		throw new Error(`Wrong command! Try: \n${this.help()}`)
	}

	help(): string {
		return `add <
${condimentCreators
			.map(creator => `	${creator.help()}`)
			.join('|\n')}
>\n`;
	}

	is(command: string): boolean {
		return !!command.toLowerCase().match(/add.*/)
	}

	private readonly _order: Order;
}


export {AddCondiment}