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
	private _count = 0;

	constructor(numBalls: number, logger: ILogger) {
		this._logger = logger;
		this._count = numBalls;
		const interfaceImpl = this._getGumballMachineInterface();
		this._soldOutState = new SoldOutState(interfaceImpl, logger);
		this._noQuarterState = new NoQuarterState(interfaceImpl, logger);
		this._hasQuarterState = new HasQuarterState(interfaceImpl, logger);
		if (this._count > 0) {
			this._state = this._noQuarterState;
		}
		else {
			this._state = this._soldOutState;
		}
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
		this._count = count;
		if (count > 0) {
			this._setNoQuarterState();
		}
		else {
			this._setSoldOutState();
		}
	}

	toString(): string {
		return `
Mighty Gumball, Inc.
JS-enabled Standing Gumball Model #2019
Inventory: ${this._count} gumball${this._count != 1 ? "s" : ""}
Machine is ${this._state.toString()}
`;
	}

	private _getGumballMachineInterface(): IGumballMachine {
		return {
			getBallCount: this._getBallCount.bind(this),
			releaseBall: this._releaseBall.bind(this),
			setSoldOutState: this._setSoldOutState.bind(this),
			setNoQuarterState: this._setNoQuarterState.bind(this),
			setHasQuarterState: this._setHasQuarterState.bind(this),
		}
	}

	private _getBallCount(): number {
		return this._count;
	}

	private _releaseBall(): void {
		if (this._count != 0) {
			this._logger.log("A gumball comes rolling out the slot...");
			--this._count;
		}
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