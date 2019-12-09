export function machineStateToString(count: number, state: string) {
	return `
Mighty Gumball, Inc.
JS-enabled Standing Gumball Model #2016
Inventory: ${count} gumball${count != 1 ? "s" : ""}
Machine is ${state}
`;
}