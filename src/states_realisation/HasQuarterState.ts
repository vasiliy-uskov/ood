import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {ILogger} from "../ILogger";

export class HasQuarterState implements IState {
	public static readonly MAX_QUARTERS_COUNT = 5;

	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: ILogger;

	constructor(gumballMachine: IGumballMachine, logger: ILogger) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		if (this._gumballMachine.getQuartersCount() < HasQuarterState.MAX_QUARTERS_COUNT) {
			this._gumballMachine.insertQuarter();
			this._logger.log("You inserted a quarter");
		}
		else {
			this._logger.log("You can't insert another quarter");
		}
	}

	ejectQuarter(): void {
		const quartersCount = this._gumballMachine.getQuartersCount();
		this._logger.log(`${quartersCount} quarter${quartersCount > 1 ? "s" : ""} returned`);
		this._gumballMachine.ejectQuarters();
		this._gumballMachine.setNoQuarterState();
	}

	turnCrank(): void {
		this._logger.log("You turned...");
		this._gumballMachine.releaseBall();
		this._logger.log("A gumball comes rolling out the slot...");
		if (!this._gumballMachine.getBallCount()) {
			this._logger.log("Oops, out of gumballs");
			this._gumballMachine.setSoldOutState();
		}
		else if (!this._gumballMachine.getQuartersCount()) {
			this._gumballMachine.setNoQuarterState();
		}
	}

	toString(): string {
		return "waiting for turn of crank";
	}
}