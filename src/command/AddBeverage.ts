import {Order} from "../Order";
import {ICommand} from "./ICommand";
import {
	CapuccinoCreator,
	EspressoCreator,
	IBeverageCreator,
	LatteCreator,
	MilkshakeCreator,
	TeaCreator
} from "./beverages/BeveragesCreators";

const beverageCreators: Array<Readonly<IBeverageCreator>> = [
	new CapuccinoCreator(),
	new LatteCreator(),
	new EspressoCreator(),
	new TeaCreator(),
	new MilkshakeCreator(),
];

class AddBeverage implements ICommand {
	constructor(order: Order) {
		this._order = order;
	}

	execute(command: string) {
		const matchResult = command.toLowerCase().match(/make (\w+)? ?(\w+)/);
		if (matchResult) {
			const args = matchResult[1];
			const type = matchResult[2];
			for (const creator of beverageCreators) {
				if (creator.is(type)) {
					this._order.addBeverage(creator.create(args))
					return;
				}
			}
		}
		throw new Error(`Wrong command!\nTry: ${this.help()}`)
	}

	help(): string {
		return `make  <
${beverageCreators
			.map(creator => `	${creator.help()}`)
			.join('|\n')}
>\n`
	}

	is(command: string): boolean {
		return !!command.toLowerCase().match(/make.*/)
	}

	private readonly _order: Order;
}

export {AddBeverage}