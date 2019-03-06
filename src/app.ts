import {createInterface} from 'readline';
import {BeverageShaker} from "./BeverageShaker";

const beverageShaker = new BeverageShaker();
createInterface({
	input: process.stdin,
}).on('line', (line) => {
	if (!line) {
		return;
	}
	try {
		beverageShaker.process(line);
		process.stdout.write(`${beverageShaker.getOrderDescription()}`)
	}
	catch (e) {
		process.stdout.write(e.message)
	}
});