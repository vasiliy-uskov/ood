import {MassExtractor, QuantityExtractor, TypeExtractor} from "./ArgsExtractors";
import {ChocolateCrumbs} from "../../condiment/ChocolateCrumbs";
import {Cinnamon} from "../../condiment/Cinnamon";
import {CoconutFlakes} from "../../condiment/CoconutFlakes";
import {Lemon} from "../../condiment/Lemon";
import {IceCubes, IceCubesType} from "../../condiment/IceCubes";
import {Syrup, SyrupType} from "../../condiment/Syrop";
import {Liquor, LiquorType} from "../../condiment/Liquor";
import {Cream} from "../../condiment/Cream";
import {ChocolateSlices} from "../../condiment/ChocolateSlices";
import {IBeverage} from "../../beverage/IBeverage";

export interface ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage;
	help(): string;
	is(condimentType: string): boolean;
}

export class ChocolateCrumbsCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const mass = this._massExtractor.extract(args);
		return (beverage: IBeverage) => new ChocolateCrumbs(mass, beverage);
	}

	help(): string {
		return `chocolate crumbs: ${this._massExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'chocolate crumbs';
	}

	private readonly _massExtractor = new MassExtractor();
}

export class CinnamonCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		return (beverage: IBeverage) => new Cinnamon(beverage);
	}

	help(): string {
		return 'cinnamon'
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'cinnamon';
	}
}

export class CoconutFlakesCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const mass = this._massExtractor.extract(args);
		return (beverage: IBeverage) => new CoconutFlakes(mass, beverage);
	}

	help(): string {
		return `сoconut flakes: ${this._massExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'сoconut flakes';
	}

	private readonly _massExtractor = new MassExtractor();
}

export class LemonCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const quantity = this._quantityExtractor.extract(args);
		return (beverage: IBeverage) => new Lemon(quantity, beverage);
	}

	help(): string {
		return `lemon: ${this._quantityExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'lemon';
	}

	private readonly _quantityExtractor = new QuantityExtractor();
}

export class IceCubesCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const type = this._typeExtractor.extract(args);
		const quantity = this._quantityExtractor.extract(args);
		return (beverage: IBeverage) => new IceCubes(quantity, type, beverage);
	}

	help(): string {
		return `ice cubes: ${this._quantityExtractor.help()} ${this._typeExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'ice cubes';
	}

	private readonly _quantityExtractor = new QuantityExtractor();
	private readonly _typeExtractor = new TypeExtractor({
		'water': IceCubesType.water,
		'dry': IceCubesType.dry,
	});
}

export class SyrupCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const type = this._typeExtractor.extract(args);
		return (beverage: IBeverage) => new Syrup(type, beverage);
	}

	help(): string {
		return `syrup: ${this._typeExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'syrup';
	}

	private readonly _typeExtractor = new TypeExtractor({
		'chocolate': SyrupType.chocolate,
		'maple': SyrupType.maple,
	});
}

export class CreamCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		return (beverage: IBeverage) => new Cream(beverage);
	}

	help(): string {
		return 'cream'
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'cream';
	}
}

export class ChocolateSlicesCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const quantity = this._quantityExtractor.extract(args);
		return (beverage: IBeverage) => new ChocolateSlices(quantity, beverage);
	}

	help(): string {
		return `chocolate slices: ${this._quantityExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'chocolate slices';
	}

	private readonly _quantityExtractor = new QuantityExtractor();
}

export class LiquorCreator implements ICondimentCreator {
	create(args: string): (beverage: IBeverage) => IBeverage {
		const type = this._typeExtractor.extract(args);
		return (beverage: IBeverage) => new Liquor(type, beverage);
	}

	help(): string {
		return `liquor: ${this._typeExtractor.help()}`
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'liquor';
	}

	private readonly _typeExtractor = new TypeExtractor({
		'chocolate': LiquorType.chocolate,
		'nuts': LiquorType.nuts,
	});
}