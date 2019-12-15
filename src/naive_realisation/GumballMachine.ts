import {ILogger} from "../ILogger";

export class GumballMachine {
	public static readonly MAX_QUARTERS_COUNT = 5;

	private _gumballsCount: number;
	private _logger: ILogger;
	private _quartersCount = 0;

	constructor(count: number, logger: ILogger) {
		this._gumballsCount = count;
		this._logger = logger;
	}

	insertQuarter(): void {
		if (!this._gumballsCount) {
			this._logger.log("You can't insert a quarter, the machine is sold out");
		}
		else if (this._quartersCount < GumballMachine.MAX_QUARTERS_COUNT) {
			this._logger.log("You inserted a quarter");
			this._quartersCount++;
		}
		else {
			this._logger.log("You can't insert another quarter");
		}
	}

	ejectQuarter(): void {
		if (this._quartersCount) {
			this._logger.log(`${this._quartersCount} quarter${this._quartersCount > 1 ? "s" : ""} returned`);
			this._quartersCount = 0;
		}
		else {
			this._logger.log("You can't eject, you haven't inserted a quarter yet");
		}
	}

	turnCrank(): void {
		if (!this._gumballsCount) {
			this._logger.log("You turned but there's no gumballs");
		}
		else if (!this._quartersCount) {
			this._logger.log("You turned but there's no quarter");
		}
		else {
			this._logger.log("You turned...");
			this._logger.log("A gumball comes rolling out the slot...");
			--this._gumballsCount;
			--this._quartersCount;
			if (this._gumballsCount == 0) {
				this._logger.log("Oops, out of gumballs");
			}
		}
	}

	refill(gumballsCount: number): void {
		this._gumballsCount = gumballsCount;
	}

	toString(): string {
		return `
Mighty Gumball, Inc.
JS-enabled Standing Gumball Model #2019
Inventory: ${this._gumballsCount} gumball${this._gumballsCount != 1 ? "s" : ""}
Machine is ${this._getMachineState()}
`;
	}

	private _getMachineState() {
		if (!this._gumballsCount) {
			return "sold out";
		}
		else if (!this._quartersCount) {
			return "waiting for quarter";
		}
		else {
			return "waiting for turn of crank";
		}
	}
}