import { assert } from "chai";

import {Observable} from "../src/Observer";
import {IObserver} from "../src/Observer";

class Dispatcher extends Observable<void> {
    protected _getObservableData() {}
}

class RemoveOtherObserverObserver implements IObserver<void> {
    constructor(observable: Dispatcher, otherObserver: UnexpectedUpdateObserver) {
        this._observable = observable;
        this._otherObserver = otherObserver;
    }

    update() {
        this._observable.removeObserver(this._otherObserver);
    }

    private _otherObserver: UnexpectedUpdateObserver;
    private _observable: Dispatcher;
}

class UnexpectedUpdateObserver implements IObserver<void> {
    public update() {
        assert("");
    }
}

class FirstUpdateExpectObserver implements IObserver<void> {
    constructor(otherObserver: TellUpdateObserver) {
        this._otherObserver = otherObserver;
    }

    update() {
        if (this._otherObserver.wasUpdated) {
            assert("");
        }
    }

    private _otherObserver: TellUpdateObserver;
}


class TellUpdateObserver implements IObserver<void> {
    constructor() {
        this.wasUpdated = false;
    }

    update() {
        this.wasUpdated = true;
    }

    public wasUpdated: boolean = false;
}

describe("Observable", () => {
    it("should not update deleted observers while notifyObservers work", () => {
        const observable = new Dispatcher();
        const secondObserver = new UnexpectedUpdateObserver();
        const firstObserver = new RemoveOtherObserverObserver(observable, secondObserver);
        observable.addObserver(firstObserver);
        observable.addObserver(secondObserver);
        observable.notifyObservers();
    });
    it("should notify observers by priority", () => {
        const observable = new Dispatcher();
        const secondObserver = new TellUpdateObserver();
        const firstObserver = new FirstUpdateExpectObserver(secondObserver);
        observable.addObserver(secondObserver, 2);
        observable.addObserver(firstObserver, 1);
        observable.notifyObservers();
    })
});
