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

describe('ejectQuarter', () => {
	it('Если нет вставленных четвертаков, ничего не происходит', () => {
		const gumballMachine = new MockGumballMachine();
		const state = new SoldOutState(gumballMachine, new MockLogger());
		state.ejectQuarter();
		gumballMachine.checkGumballMachineDoNotChangeState();
	});
	it('Если есть вставленные четвертаки, они возвращаются клиенту', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.quartersCount = 2;
		const state = new SoldOutState(gumballMachine, new MockLogger());
		state.ejectQuarter();
		expect(gumballMachine.ejectQuarters).toBeCalled();
		expect(gumballMachine.insertQuarter).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
		expect(gumballMachine.setNoQuarterState).not.toBeCalled();
		expect(gumballMachine.setSoldOutState).not.toBeCalled();
		expect(gumballMachine.releaseBall).not.toBeCalled();
	})
});

it('turnCrank', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new SoldOutState(gumballMachine, new MockLogger());
	state.turnCrank();
	gumballMachine.checkGumballMachineDoNotChangeState();
});