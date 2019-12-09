import {GumballMachine} from "../src/GumballMachineWithState";
import {MockLogger} from "./MockLogger";

function useCase(message: string, startGumballsCount: number, useCaseFn: (machine: GumballMachine) => void) {
	it(message, () => {
		const logger = new MockLogger();
		const machine = new GumballMachine(startGumballsCount, logger.getLogger());
		useCaseFn(machine);
		logger.matchResult();
		expect(machine.toString()).toMatchSnapshot();
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

useCase('Если ручка была провёрнута четвертак изъять нельзя', 1, machine => {
	machine.insertQuarter();
	machine.turnCrank();
	machine.ejectQuarter();
});


useCase('Нельзя провернуть ручку, если четвертак не был вставлен', 1, machine => {
	machine.turnCrank();
});

useCase('Нельзя получить жвачку если она закочилась', 0, machine => {
	machine.insertQuarter();
	machine.turnCrank();
});