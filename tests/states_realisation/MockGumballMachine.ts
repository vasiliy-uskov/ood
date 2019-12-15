export class MockGumballMachine {
	public gumballCount = 0;
	public quartersCount = 0;

	insertQuarter = jest.fn();

	ejectQuarters = jest.fn();

	getQuartersCount() {
		return this.quartersCount;
	}

	getBallCount(): number {
		return this.gumballCount;
	}

	releaseBall = jest.fn();

	setSoldOutState = jest.fn();

	setNoQuarterState = jest.fn();

	setHasQuarterState = jest.fn();

	checkGumballMachineDoNotChangeState() {
		expect(this.ejectQuarters).not.toBeCalled();
		expect(this.insertQuarter).not.toBeCalled();
		expect(this.setHasQuarterState).not.toBeCalled();
		expect(this.setNoQuarterState).not.toBeCalled();
		expect(this.setSoldOutState).not.toBeCalled();
		expect(this.releaseBall).not.toBeCalled();
	}
}
