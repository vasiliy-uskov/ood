export interface IGumballMachine {
	insertQuarter(): void;

	ejectQuarters(): void;

	getQuartersCount(): number;

	releaseBall(): void;

	getBallCount(): number;

	setSoldOutState(): void;

	setNoQuarterState(): void;

	setHasQuarterState(): void;
}
