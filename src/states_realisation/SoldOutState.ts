import {IState} from "./IState";
import {IGumballMachine} from "./IGumballMachine";
import {ILogger} from "../ILogger";

export class SoldOutState implements IState {
	private readonly _gumballMachine: IGumballMachine;
	private readonly _logger: ILogger;

	constructor(gumballMachine: IGumballMachine, logger: ILogger) {
		this._gumballMachine = gumballMachine;
		this._logger = logger;
	}

	insertQuarter(): void {
		this._logger.log("You can't insert a quarter, the machine is sold out");
	}

	ejectQuarter(): void {
		this._logger.log("You can't eject, you haven't inserted a quarter yet");
	}

	turnCrank(): void {
		this._logger.log("You turned but there's no gumballs");
	}

	toString(): string {
		return "sold out";
	}
}