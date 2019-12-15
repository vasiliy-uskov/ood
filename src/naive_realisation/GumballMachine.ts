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
				this._logger.log("You can't insert a quarter, the machine is sold out");
				break;
			case State.NoQuarter:
				this._logger.log("You inserted a quarter");
				this._state = State.HasQuarter;
				break;
			case State.HasQuarter:
				this._logger.log("You can't insert another quarter");
				break;
		}
	}

	ejectQuarter(): void {
		switch (this._state) {
			case State.HasQuarter:
				this._logger.log("Quarter returned");
				this._state = State.NoQuarter;
				break;
			case State.NoQuarter:
				this._logger.log("You haven't inserted a quarter");
				break;
			case State.SoldOut:
				this._logger.log("You can't eject, you haven't inserted a quarter yet");
				break;
		}
	}

	turnCrank(): void {
		switch (this._state) {
			case State.SoldOut:
				this._logger.log("You turned but there's no gumballs");
				break;
			case State.NoQuarter:
				this._logger.log("You turned but there's no quarter");
				break;
			case State.HasQuarter:
				this._logger.log("You turned...");
				this._logger.log("A gumball comes rolling out the slot...");
				--this._count;
				if (this._count == 0) {
					this._logger.log("Oops, out of gumballs");
					this._state = State.SoldOut;
				}
				else {
					this._state = State.NoQuarter;
				}
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
JS-enabled Standing Gumball Model #2019
Inventory: ${this._count} gumball${this._count != 1 ? "s" : ""}
Machine is ${stateToString(this._state)}
`;
	}
}