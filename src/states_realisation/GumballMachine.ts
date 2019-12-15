import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {SoldOutState} from "./SoldOutState";
import {NoQuarterState} from "./NoQuarterState";
import {HasQuarterState} from "./HasQuarterState";
import {ILogger} from "../ILogger";

export class GumballMachine {
	private readonly _logger: ILogger;
	private readonly _soldOutState: SoldOutState;
	private readonly _noQuarterState: NoQuarterState;
	private readonly _hasQuarterState: HasQuarterState;
	private _state: IState;
	private _gumballsCount: number;
	private _quartersCount = 0;

	constructor(gumballsCount: number, logger: ILogger) {
		this._logger = logger;
		const interfaceImpl = this._getGumballMachineInterface();
		this._soldOutState = new SoldOutState(interfaceImpl, logger);
		this._noQuarterState = new NoQuarterState(interfaceImpl, logger);
		this._hasQuarterState = new HasQuarterState(interfaceImpl, logger);
		this.refill(gumballsCount)
	}

	ejectQuarter() {
		this._state.ejectQuarter();
	}

	insertQuarter() {
		this._state.insertQuarter();
	}

	turnCrank() {
		this._state.turnCrank();
	}

	refill(count: number) {
		this._gumballsCount = count;
		if (!this._gumballsCount) {
			this._setSoldOutState();
		}
		else if (this._quartersCount) {
			this._setHasQuarterState();
		}
		else {
			this._setNoQuarterState();
		}
	}

	toString(): string {
		return `
Mighty Gumball, Inc.
JS-enabled Standing Gumball Model #2019
Inventory: ${this._gumballsCount} gumball${this._gumballsCount != 1 ? "s" : ""}
Machine is ${this._state.toString()}
`;
	}

	private _getGumballMachineInterface(): IGumballMachine {
		return {
			getQuartersCount: this._getQuartersCount.bind(this),
			insertQuarter: this._insertQuarter.bind(this),
			ejectQuarters: this._ejectQuarters.bind(this),
			getBallCount: this._getBallCount.bind(this),
			releaseBall: this._releaseBall.bind(this),
			setSoldOutState: this._setSoldOutState.bind(this),
			setNoQuarterState: this._setNoQuarterState.bind(this),
			setHasQuarterState: this._setHasQuarterState.bind(this),
		}
	}

	private _getQuartersCount(): number {
		return this._quartersCount;
	}

	private _insertQuarter(): void {
		++this._quartersCount;
	}

	private _ejectQuarters(): void {
		this._quartersCount = 0;
	}

	private _getBallCount(): number {
		return this._gumballsCount;
	}

	private _releaseBall(): void {
		--this._gumballsCount;
		--this._quartersCount;
	}

	private _setSoldOutState(): void {
		this._state = this._soldOutState;
	}

	private _setNoQuarterState(): void {
		this._state = this._noQuarterState;
	}

	private _setHasQuarterState(): void {
		this._state = this._hasQuarterState;
	}
}