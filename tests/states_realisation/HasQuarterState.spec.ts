import {MockGumballMachine} from "./MockGumballMachine";
import {MockLogger} from "../MockLogger";
import {HasQuarterState} from "../../src/states_realisation/HasQuarterState";

it('toString', () => {
	const state = new HasQuarterState(new MockGumballMachine(), new MockLogger());
	expect(state.toString()).toMatchSnapshot();
});

describe('insertQuarter', () => {
	it('Если в автомате четвертаков меньше, чем максимальное число, то вставляется четвертак', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.quartersCount = 1;
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.insertQuarter();
		expect(gumballMachine.insertQuarter).toBeCalled();
		expect(gumballMachine.ejectQuarters).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
		expect(gumballMachine.setNoQuarterState).not.toBeCalled();
		expect(gumballMachine.setSoldOutState).not.toBeCalled();
		expect(gumballMachine.releaseBall).not.toBeCalled();
	});
	it('Если в автомате четвертаков максимальное число, то вставляется четвертак', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.quartersCount = HasQuarterState.MAX_QUARTERS_COUNT;
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.insertQuarter();
		gumballMachine.checkGumballMachineDoNotChangeState();
	});
});

it('ejectQuarter', () => {
	const gumballMachine = new MockGumballMachine();
	const state = new HasQuarterState(gumballMachine, new MockLogger());
	state.ejectQuarter();
	expect(gumballMachine.setNoQuarterState).toBeCalled();
	expect(gumballMachine.ejectQuarters).toBeCalled();
	expect(gumballMachine.insertQuarter).not.toBeCalled();
	expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	expect(gumballMachine.setSoldOutState).not.toBeCalled();
	expect(gumballMachine.releaseBall).not.toBeCalled();
});

describe('turnCrank', () => {
	it('Если автомат пустой, то выставляется состояние SoldOut', () => {
		const gumballMachine = new MockGumballMachine();
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.turnCrank();
		expect(gumballMachine.setSoldOutState).toBeCalled();
		expect(gumballMachine.releaseBall).toBeCalled();
		expect(gumballMachine.setNoQuarterState).not.toBeCalled();
		expect(gumballMachine.ejectQuarters).not.toBeCalled();
		expect(gumballMachine.insertQuarter).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	});
	it('Если автомат не пустой и остались, вставленные, четвертаки, то автомат остаётся в текущем состоянии', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.gumballCount = 1;
		gumballMachine.quartersCount = 1;
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.turnCrank();
		expect(gumballMachine.releaseBall).toBeCalled();
		expect(gumballMachine.setSoldOutState).not.toBeCalled();
		expect(gumballMachine.setNoQuarterState).not.toBeCalled();
		expect(gumballMachine.ejectQuarters).not.toBeCalled();
		expect(gumballMachine.insertQuarter).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	});
	it('Если автомат не пустой и не осталось, вставленных, четвертаков, то автомат переходит в состояние NoQuarters', () => {
		const gumballMachine = new MockGumballMachine();
		gumballMachine.gumballCount = 1;
		gumballMachine.quartersCount = 0;
		const state = new HasQuarterState(gumballMachine, new MockLogger());
		state.turnCrank();
		expect(gumballMachine.releaseBall).toBeCalled();
		expect(gumballMachine.setNoQuarterState).toBeCalled();
		expect(gumballMachine.setSoldOutState).not.toBeCalled();
		expect(gumballMachine.ejectQuarters).not.toBeCalled();
		expect(gumballMachine.insertQuarter).not.toBeCalled();
		expect(gumballMachine.setHasQuarterState).not.toBeCalled();
	});
});