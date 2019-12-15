import {SoldOutState} from "../../src/states_realisation/SoldOutState";
import {MockGumballMachine} from "./MockGumballMachine";
import {MockLogger} from "../MockLogger";


it('toString', () => {
	const state = new SoldOutState(new MockGumballMachine(), new MockLogger());
	expect(state.toString()).toMatchSnapshot();
});

it('insertQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new SoldOutState(gumballMachine, new MockLogger());
	state.insertQuarter();
	gumballMachine.checkGumballMachineDoNotChangeState();
});

it('ejectQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new SoldOutState(gumballMachine, new MockLogger());
	state.ejectQuarter();
	gumballMachine.checkGumballMachineDoNotChangeState();
});

it('turnCrank', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new SoldOutState(gumballMachine, new MockLogger());
	state.turnCrank();
	gumballMachine.checkGumballMachineDoNotChangeState();
});