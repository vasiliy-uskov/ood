import {MockGumballMachine} from "./MockGumballMachine";
import {MockLogger} from "../MockLogger";
import {HasQuarterState} from "../../src/states_realisation/HasQuarterState";

it('toString', () => {
	const state = new HasQuarterState(new MockGumballMachine(), new MockLogger());
	expect(state.toString()).toMatchSnapshot();
});

it('insertQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new HasQuarterState(gumballMachine, new MockLogger());
	state.insertQuarter();
	gumballMachine.checkGumballMachineDoNotChangeState();
});

it('ejectQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new HasQuarterState(gumballMachine, new MockLogger());
	state.ejectQuarter();
	expect(gumballMachine.setNoQuarterState).toBeCalled();
	expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	expect(gumballMachine.setSoldOutState).not.toBeCalled();
	expect(gumballMachine.releaseBall).not.toBeCalled();
});

describe('turnCrank', () => {
	it('Если автомат пустой, то выставляется состояние SoldOut', () => {
		const gumballMachine = new MockGumballMachine();
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.turnCrank();
		expect(gumballMachine.releaseBall).toBeCalled();
		expect(gumballMachine.setSoldOutState).toBeCalled();
		expect(gumballMachine.setNoQuarterState).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	});
	it('Если автомат не пустой, то выставляется состояние NoQuarter', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.count = 1;
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.turnCrank();
		expect(gumballMachine.releaseBall).toBeCalled();
		expect(gumballMachine.setNoQuarterState).toBeCalled();
		expect(gumballMachine.setSoldOutState).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	})
});