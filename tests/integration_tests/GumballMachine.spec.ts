import {MockLogger} from "../MockLogger";
import {GumballMachine as StatesGumballMachine} from "../../src/states_realisation/GumballMachine";
import {GumballMachine as NaiveGumballMachine} from "../../src/naive_realisation/GumballMachine";
import {IGumballMachine} from "../../src/IGumballMachine";

function createStatesGumballMachine(startGumballsCount: number): {logger: MockLogger, machine: IGumballMachine} {
	const logger = new MockLogger();
	const machine = new StatesGumballMachine(startGumballsCount, logger);
	return {logger, machine}
}

function createNaiveGumballMachine(startGumballsCount: number): {logger: MockLogger, machine: IGumballMachine} {
	const logger = new MockLogger();
	const machine = new NaiveGumballMachine(startGumballsCount, logger);
	return {logger, machine}
}

function getMachines(startGumballsCount: number): Array<{logger: MockLogger, machine: IGumballMachine}> {
	return [
		createNaiveGumballMachine(startGumballsCount),
		createStatesGumballMachine(startGumballsCount),
	]
}

function checkAllElementsEquals<T>(items: Array<T>): void {
	if (!items.length) {
		return;
	}
	for (const item of items)
	{
		expect(item).toBe(items[0]);
	}
}

function useCase(message: string, startGumballsCount: number, useCaseFn: (machine: IGumballMachine) => void) {
	it(message, () => {
		const machines = getMachines(startGumballsCount);
		for (const {machine} of machines) {
			useCaseFn(machine);
		}
		const loggerResults = machines.map(({logger}) => logger.result());
		const states = machines.map(({machine}) => machine.toString());
		checkAllElementsEquals(loggerResults);
		checkAllElementsEquals(states);
		expect(states[0]).toMatchSnapshot();
		expect(loggerResults[0]).toMatchSnapshot();
	});
}

useCase('Если вставить четвертак и провернуть ручку, машина отдаёт жвачку', 1, machine => {
	machine.insertQuarter();
	machine.turnCrank();
});

useCase('После первого шарика жвачки можно получить следующий, если в автомате есть жвачка', 2, machine => {
	machine.insertQuarter();
	machine.turnCrank();
	machine.insertQuarter();
	machine.turnCrank();
});

useCase('Можно забрать четвертак, после того как он был вставлен', 1, machine => {
	machine.insertQuarter();
	machine.ejectQuarter();
});

useCase('Можно забрать несколько четвертаков, после того как они были вставлены', 1, machine => {
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
	machine.ejectQuarter();
});

useCase('Можно вставлять до пяти четвертаков', 1, machine => {
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
});

useCase('Если количество вставленных четвертаков больше, чем жвачки, хранящейся в автомате, то можно вернуть оставшиеся четвертаки', 1, machine => {
	machine.insertQuarter();
	machine.insertQuarter();
	machine.turnCrank();
	machine.turnCrank();
	machine.ejectQuarter();
	machine.turnCrank();
});

useCase('Можно заполнить автомат', 0, machine => {
	machine.refill(1);
});

useCase('Можно достать всю жвачку из автомата', 2, machine => {
	machine.refill(0);
});

useCase('При заполнении автомата, вставленные четвертаки не теряются', 1, machine => {
	machine.insertQuarter();
	machine.insertQuarter();
	machine.insertQuarter();
	machine.turnCrank();
	machine.turnCrank();
	machine.refill(5);
	machine.turnCrank();
	machine.turnCrank();
});


useCase('Если ручка была провёрнута четвертак изъять нельзя', 1, machine => {
	machine.insertQuarter();
	machine.turnCrank();
	machine.ejectQuarter();
});

useCase('Нельзя вставить два четвертака за раз', 2, machine => {
	machine.insertQuarter();
	machine.insertQuarter();
});

useCase('Нельзя достать четвертак, если он не был всавлен', 2, machine => {
	machine.ejectQuarter();
});


useCase('Нельзя провернуть ручку, если четвертак не был вставлен', 1, machine => {
	machine.turnCrank();
});

useCase('Нельзя получить жвачку если она закочилась', 0, machine => {
	machine.insertQuarter();
	machine.turnCrank();
});