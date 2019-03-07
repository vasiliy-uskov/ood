import {Capuccino} from "../../beverage/Capuccino";
import {IBeverage} from "../../beverage/IBeverage";
import {Portion, PortionSize} from "../../beverage/PortionSize";
import {Tea, TeaType} from "../../beverage/Tea";
import {Milkshake} from "../../beverage/Milkshake";
import {Latte} from "../../beverage/Latte";
import {Espresso} from "../../beverage/Espresso";

export interface IBeverageCreator {
	create(args: string): IBeverage;
	help(): string;
	is(beverageType: string): boolean;
}

export class CapuccinoCreator implements IBeverageCreator {
	create(args: string): Capuccino {
		return new Capuccino(getPortion(args, this.help()))
	}

	help(): string {
		return `<standard|double> capuccino`;
	}

	is(beverageType: string): boolean {
		return beverageType.toLowerCase() == 'capuccino'
	}
}

export class LatteCreator implements IBeverageCreator {
	create(args: string): Latte {
		return new Latte(getPortion(args, this.help()))
	}

	help(): string {
		return `<standard|double> latte`;
	}

	is(beverageType: string): boolean {
		return beverageType.toLowerCase() == 'latte'
	}
}

export class EspressoCreator implements IBeverageCreator {
	create(args: string): Espresso {
		return new Espresso()
	}

	help(): string {
		return `espresso`;
	}

	is(beverageType: string): boolean {
		return beverageType.toLowerCase() == 'espresso'
	}
}

export class TeaCreator implements IBeverageCreator {
	create(args: string): Tea {
		return new Tea(getTeaType(args, this.help()))
	}

	help(): string {
		return `<green|black|herbal|brew> tea`;
	}

	is(beverageType: string): boolean {
		return beverageType.toLowerCase() == 'tea'
	}
}

export class MilkshakeCreator implements IBeverageCreator {
	create(args: string): Milkshake {
		return new Milkshake(getPortionSize(args, this.help()))
	}

	help(): string {
		return `<small|middle|large> milkshake`;
	}

	is(beverageType: string): boolean {
		return beverageType.toLowerCase() == 'milkshake'
	}
}

function getPortionSize(args: string, help: string): PortionSize {
	switch (args.toLowerCase()) {
		case 'small':
			return PortionSize.small;
		case 'middle':
			return PortionSize.middle;
		case 'large':
			return PortionSize.large;
		default:
			throw new Error(`Invalid parameters.\n Try: ${help}`)
	}
}

function getTeaType(args: string, help: string): TeaType {
	switch (args.toLowerCase()) {
		case 'green':
			return TeaType.green;
		case 'black':
			return TeaType.black;
		case 'herbal':
			return TeaType.herbal;
		case 'brew':
			return TeaType.brew;
		default:
			throw new Error(`Invalid parameters.\n Try: ${help}`)
	}
}

function getPortion(args: string, help: string): Portion {
	switch (args.toLowerCase()) {
		case 'standard':
			return Portion.standard;
		case 'double':
			return Portion.double;
		default:
			throw new Error(`Invalid parameters.\n Try: ${help}`)
	}
}