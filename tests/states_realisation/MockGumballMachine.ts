export class MockGumballMachine {
	public count = 0;

	getBallCount(): number {
		return this.count;
	}
	releaseBall = jest.fn();

	setSoldOutState = jest.fn();

	setNoQuarterState = jest.fn();

	setHasQuarterState = jest.fn();

	checkGumballMachineDoNotChangeState() {
		expect(this.setHasQuarterState).not.toBeCalled();
		expect(this.setNoQuarterState).not.toBeCalled();
		expect(this.setSoldOutState).not.toBeCalled();
		expect(this.releaseBall).not.toBeCalled();
	}
}
