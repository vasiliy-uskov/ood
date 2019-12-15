import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {ILogger} from "../ILogger";

export class HasQuarterState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: ILogger;

	constructor(gumballMachine: IGumballMachine, logger: ILogger) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger.log("You can't insert another quarter");
	}

	ejectQuarter(): void {
		this._logger.log("Quarter returned");
		this._gumballMachine.setNoQuarterState();
	}

	turnCrank(): void {
		this._logger.log("You turned...");
		this._gumballMachine.setSoldState();
	}

	dispense(): void {
		this._logger.log("No gumball dispensed");
	}

	toString(): string {
		return "waiting for turn of crank";
	}
}