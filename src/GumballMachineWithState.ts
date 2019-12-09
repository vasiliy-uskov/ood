import {machineStateToString} from "./Logger";

interface IState {
	insertQuarter(): void;

	ejectQuarter(): void;

	turnCrank(): void;

	dispense(): void;

	toString(): string;
}

interface IGumballMachine {
	releaseBall(): void;

	getBallCount(): number;

	setSoldOutState(): void;

	setNoQuarterState(): void;

	setSoldState(): void;

	setHasQuarterState(): void;
}

class SoldState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: (str: string) => void;

	constructor(gumballMachine: IGumballMachine, logger: (str: string) => void) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger("Please wait, we're already giving you a gumball");
	}

	ejectQuarter(): void {
		this._logger("Sorry you already turned the crank");
	}

	turnCrank(): void {
		this._logger("Turning twice doesn't get you another gumball");
	}

	dispense(): void {
		this._gumballMachine.releaseBall();
		if (this._gumballMachine.getBallCount() == 0) {
			this._logger("Oops, out of gumballs");
			this._gumballMachine.setSoldOutState();
		}
		else {
			this._gumballMachine.setNoQuarterState();
		}
	}

	toString(): string {
		return "delivering a gumball";
	}
}

class SoldOutState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: (str: string) => void;

	constructor(gumballMachine: IGumballMachine, logger: (str: string) => void) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger("You can't insert a quarter, the machine is sold out");
	}

	ejectQuarter(): void {
		this._logger("You can't eject, you haven't inserted a quarter yet");
	}

	turnCrank(): void {
		this._logger("You turned but there's no gumballs");
	}

	dispense(): void {
		this._logger("No gumball dispensed");
	}

	toString(): string {
		return "sold out";
	}
}

class HasQuarterState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: (str: string) => void;

	constructor(gumballMachine: IGumballMachine, logger: (str: string) => void) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger("You can't insert another quarter");
	}

	ejectQuarter(): void {
		this._logger("Quarter returned");
		this._gumballMachine.setNoQuarterState();
	}

	turnCrank(): void {
		this._logger("You turned...");
		this._gumballMachine.setSoldState();
	}

	dispense(): void {
		this._logger("No gumball dispensed");
	}

	toString(): string {
		return "waiting for turn of crank";
	}
}

class NoQuarterState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: (str: string) => void;

	constructor(gumballMachine: IGumballMachine, logger: (str: string) => void) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger("You inserted a quarter");
		this._gumballMachine.setHasQuarterState();
	}

	ejectQuarter(): void {
		this._logger("You haven't inserted a quarter");
	}

	turnCrank(): void {
		this._logger("You turned but there's no quarter");
	}

	dispense(): void {
		this._logger("You need to pay first");
	}

	toString(): string {
		return "waiting for quarter";
	}
}

export class GumballMachine {
	private readonly _logger: (str: string) => void;
	private readonly _soldState: SoldState;
	private readonly _soldOutState: SoldOutState;
	private readonly _noQuarterState: NoQuarterState;
	private readonly _hasQuarterState: HasQuarterState;
	private _state: IState;
	private _count = 0;

	constructor(numBalls: number, logger: (str: string) => void) {
		this._logger = logger;
		this._count = numBalls;
		const interfaceImpl = this._getGumballMachineInterface();
		this._soldOutState = new SoldOutState(interfaceImpl, logger);
		this._soldState = new SoldState(interfaceImpl, logger);
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
		this._state.dispense();
	}

	toString(): string {
		return machineStateToString(this._count, this._state.toString());
	}

	private _getGumballMachineInterface(): IGumballMachine {
		return {
			getBallCount: this._getBallCount.bind(this),
			releaseBall: this._releaseBall.bind(this),
			setSoldOutState: this._setSoldOutState.bind(this),
			setNoQuarterState: this._setNoQuarterState.bind(this),
			setSoldState: this._setSoldState.bind(this),
			setHasQuarterState: this._setHasQuarterState.bind(this),
		}
	}

	private _getBallCount(): number {
		return this._count;
	}

	private _releaseBall(): void {
		if (this._count != 0) {
			this._logger("A gumball comes rolling out the slot...");
			--this._count;
		}
	}

	private _setSoldOutState(): void {
		this._state = this._soldOutState;
	}

	private _setNoQuarterState(): void {
		this._state = this._noQuarterState;
	}

	private _setSoldState(): void {
		this._state = this._soldState;
	}

	private _setHasQuarterState(): void {
		this._state = this._hasQuarterState;
	}
}