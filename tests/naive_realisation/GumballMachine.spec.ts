import {MockLogger} from "../MockLogger";
import {GumballMachine} from "../../src/naive_realisation/GumballMachine";

function useCase(message: string, startGumballsCount: number, useCaseFn: (machine: GumballMachine) => void) {
	it(message, () => {
		const logger = new MockLogger();
		const machine = new GumballMachine(startGumballsCount, logger);
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

useCase('Можно заполнить автомат', 0, machine => {
	machine.refill(1);
});

useCase('Можно достать всю жвачку из автомата', 2, machine => {
	machine.refill(0);
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