export interface IState {
	insertQuarter(): void;

	ejectQuarter(): void;

	turnCrank(): void;

	dispense(): void;

	toString(): string;
}