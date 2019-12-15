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
		return "waiting for turn of crank";
	}
}