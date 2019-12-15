import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {ILogger} from "../ILogger";

export class SoldState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: ILogger;

	constructor(gumballMachine: IGumballMachine, logger: ILogger) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger.log("Please wait, we're already giving you a gumball");
	}

	ejectQuarter(): void {
		this._logger.log("Sorry you already turned the crank");
	}

	turnCrank(): void {
		this._logger.log("Turning twice doesn't get you another gumball");
	}

	dispense(): void {
		this._gumballMachine.releaseBall();
		if (this._gumballMachine.getBallCount() == 0) {
			this._logger.log("Oops, out of gumballs");
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