export interface IGumballMachine {
	ejectQuarter(): void;
	insertQuarter(): void;
	turnCrank(): void;
	refill(count: number): void;
}