import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {ILogger} from "../ILogger";

export class NoQuarterState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: ILogger;

	constructor(gumballMachine: IGumballMachine, logger: ILogger) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger.log("You inserted a quarter");
		this._gumballMachine.setHasQuarterState();
	}

	ejectQuarter(): void {
		this._logger.log("You haven't inserted a quarter");
	}

	turnCrank(): void {
		this._logger.log("You turned but there's no quarter");
	}

	dispense(): void {
		this._logger.log("You need to pay first");
	}

	toString(): string {
		return "waiting for quarter";
	}
}