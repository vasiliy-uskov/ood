import {NoQuarterState} from "../../src/states_realisation/NoQuarterState";
import {MockGumballMachine} from "./MockGumballMachine";
import {MockLogger} from "../MockLogger";

it('toString', () => {
	const state = new NoQuarterState(new MockGumballMachine(), new MockLogger());
	expect(state.toString()).toMatchSnapshot();
});

it('insertQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new NoQuarterState(gumballMachine, new MockLogger());
	state.insertQuarter();
	expect(gumballMachine.setHasQuarterState).toBeCalled();
	expect(gumballMachine.setNoQuarterState).not.toBeCalled();
	expect(gumballMachine.setSoldOutState).not.toBeCalled();
	expect(gumballMachine.releaseBall).not.toBeCalled();
});

it('ejectQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new NoQuarterState(gumballMachine, new MockLogger());
	state.ejectQuarter();
	gumballMachine.checkGumballMachineDoNotChangeState();
});

it('turnCrank', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new NoQuarterState(gumballMachine, new MockLogger());
	state.turnCrank();
	gumballMachine.checkGumballMachineDoNotChangeState();
});