export interface IGumballMachine {
	releaseBall(): void;

	getBallCount(): number;

	setSoldOutState(): void;

	setNoQuarterState(): void;

	setHasQuarterState(): void;
}
