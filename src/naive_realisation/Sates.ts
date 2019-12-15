export enum State {
	SoldOut,
	NoQuarter,
	HasQuarter,
	Sold,
}


export function stateToString(state: State) {
	switch (state) {
		case State.HasQuarter:
			return "waiting for turn of crank";
		case State.SoldOut:
			return "sold out";
		case State.NoQuarter:
			return "waiting for quarter";
		case State.Sold:
			return "delivering a gumball";
	}
}