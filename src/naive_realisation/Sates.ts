export enum State {
	SoldOut,
	NoQuarter,
	HasQuarter,
}


export function stateToString(state: State) {
	switch (state) {
		case State.HasQuarter:
			return "waiting for turn of crank";
		case State.SoldOut:
			return "sold out";
		case State.NoQuarter:
			return "waiting for quarter";
	}
}