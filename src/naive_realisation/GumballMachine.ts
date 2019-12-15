import {State, stateToString} from "./Sates";
import {ILogger} from "../ILogger";

export class GumballMachine {
	private _state: State;
	private _count: number;
	private _logger: ILogger;

	constructor(count: number, logger: ILogger) {
		this._state = count > 0 ? State.NoQuarter : State.SoldOut;
		this._count = count;
		this._logger = logger;
	}

	insertQuarter(): void {
		switch (this._state) {
			case State.SoldOut:
				this._logger.log("You can't insert a quarter, the machine is sold out\n");
				break;
			case State.NoQuarter:
				this._logger.log("You inserted a quarter\n");
				this._state = State.HasQuarter;
				break;
			case State.HasQuarter:
				this._logger.log("You can't insert another quarter\n");
				break;
			case State.Sold:
				this._logger.log("Please wait, we're already giving you a gumball\n");
				break;
		}
	}

	ejectQuarter(): void {
		switch (this._state) {
			case State.HasQuarter:
				this._logger.log("Quarter returned\n");
				this._state = State.NoQuarter;
				break;
			case State.NoQuarter:
				this._logger.log("You haven't inserted a quarter\n");
				break;
			case State.Sold:
				this._logger.log("Sorry you already turned the crank\n");
				break;
			case State.SoldOut:
				this._logger.log("You can't eject, you haven't inserted a quarter yet\n");
				break;
		}
	}

	turnCrank(): void {
		switch (this._state) {
			case State.SoldOut:
				this._logger.log("You turned but there's no gumballs\n");
				break;
			case State.NoQuarter:
				this._logger.log("You turned but there's no quarter\n");
				break;
			case State.HasQuarter:
				this._logger.log("You turned...\n");
				this._state = State.Sold;
				this._dispense();
				break;
			case State.Sold:
				this._logger.log("Turning twice doesn't get you another gumball\n");
				break;
		}
	}

	refill(numBalls: number): void {
		this._count = numBalls;
		this._state = numBalls > 0 ? State.NoQuarter : State.SoldOut;
	}

	toString(): string {
		return `
Mighty Gumball, Inc.
JS-enabled Standing Gumball Model #2016
Inventory: ${this._count} gumball${this._count != 1 ? "s" : ""}
Machine is ${stateToString(this._state)}
`;
	}

	private _dispense(): void {
		switch (this._state) {
			case State.Sold:
				this._logger.log("A gumball comes rolling out the slot\n");
				--this._count;
				if (this._count == 0) {
					this._logger.log("Oops, out of gumballs\n");
					this._state = State.SoldOut;
				}
				else {
					this._state = State.NoQuarter;
				}
				break;
			case State.NoQuarter:
				this._logger.log("You need to pay first\n");
				break;
			case State.SoldOut:
			case State.HasQuarter:
				this._logger.log("No gumball dispensed\n");
				break;
		}
	}
}