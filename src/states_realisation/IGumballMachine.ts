export interface IGumballMachine {
	releaseBall(): void;

	getBallCount(): number;

	setSoldOutState(): void;

	setNoQuarterState(): void;

	setSoldState(): void;

	setHasQuarterState(): void;
}
