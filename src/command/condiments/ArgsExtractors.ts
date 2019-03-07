class MassExtractor {
	extract(args: string): number {
		try {
			return +(args.match(/mass(?: )*([0-9]+)/i)[1])
		}
		catch {
			throw new Error(`\nCan not find mass.\nPlease specify a mass:\n${this.help()}\n`)
		}
	}

	help(): string {
		return 'mass <value>'
	}
}

class QuantityExtractor {
	extract(args: string):  number {
		try {
			return +(args.match(/quantity(?: )*([0-9]+)/i)[1])
		}
		catch {
			throw new Error(`\nCan not find quantity.\nPlease specify a quantity:\n${this.help()}\n`)
		}
	}

	help(): string {
		return 'quantity <value>'
	}
}

class TypeExtractor<T> {
	constructor(typeMap: {[key: string]: T}) {
		this._typeMap = typeMap;
		this._types = Object.keys(this._typeMap).join('|')
	}

	extract(args: string): T {
		const typeMatchResult = args.match(/type (\w+)/i);
		const chosenType = typeMatchResult ? typeMatchResult[1].toLowerCase() : '';
		for (const type of Object.keys(this._typeMap)) {
			if (chosenType == type) {
				return this._typeMap[chosenType];
			}
		}
		throw new Error(`\nCan not find type.\nPlease specify a type:\n${this.help()}\n`)
	}

	help(): string {
		return `type <${this._types}>`;
	}

	private readonly _typeMap: {[key: string]: T};
	private readonly _types: string;
}

export {
	MassExtractor,
	QuantityExtractor,
	TypeExtractor,
}