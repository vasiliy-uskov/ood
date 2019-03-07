import {MassExtractor, QuantityExtractor, TypeExtractor} from "./ArgsExtractors";
import {ICondiment} from "../../condiment/ICondiment";
import {ChocolateCrumbs} from "../../condiment/ChocolateCrumbs";
import {Cinnamon} from "../../condiment/Cinnamon";
import {CoconutFlakes} from "../../condiment/CoconutFlakes";
import {Lemon} from "../../condiment/Lemon";
import {IceCubes, IceCubesType} from "../../condiment/IceCubes";
import {Syrup, SyrupType} from "../../condiment/Syrop";
import {Liquor, LiquorType} from "../../condiment/Liquor";
import {Cream} from "../../condiment/Cream";
import {ChocolateSlices} from "../../condiment/ChocolateSlices";

export interface ICondimentCreator {
	create(args: string): ICondiment;
	help(): string;
	is(condimentType: string): boolean;
}

export class ChocolateCrumbsCreator implements ICondimentCreator {
	create(args: string): ChocolateCrumbs {
		const mass = this._massExtractor.extract(args);
		return new ChocolateCrumbs(mass);
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
	create(args: string): Cinnamon {
		return new Cinnamon();
	}

	help(): string {
		return 'cinnamon'
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'cinnamon';
	}
}

export class CoconutFlakesCreator implements ICondimentCreator {
	create(args: string): CoconutFlakes {
		const mass = this._massExtractor.extract(args);
		return new CoconutFlakes(mass);
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
	create(args: string): Lemon {
		const quantity = this._quantityExtractor.extract(args);
		return new Lemon(quantity);
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
	create(args: string): IceCubes {
		const type = this._typeExtractor.extract(args);
		const quantity = this._quantityExtractor.extract(args);
		return new IceCubes(quantity, type);
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
	create(args: string): Syrup {
		const type = this._typeExtractor.extract(args);
		return new Syrup(type);
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
	create(args: string): Cream {
		return new Cream();
	}

	help(): string {
		return 'cream'
	}

	is(condimentType: string): boolean {
		return condimentType.toLowerCase() == 'cream';
	}
}

export class ChocolateSlicesCreator implements ICondimentCreator {
	create(args: string): ChocolateSlices {
		const quantity = this._quantityExtractor.extract(args);
		return new ChocolateSlices(quantity);
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
	create(args: string): Liquor {
		const type = this._typeExtractor.extract(args);
		return new Liquor(type);
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