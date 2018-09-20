import { expect, assert } from 'chai';

import {Observable} from "../src/Observer";
import {IObserver} from "../src/Observer";

class StringDispatcher extends Observable<string> {
    protected _getObservableData() {
        return "";
    }
}

class FirstObserver implements IObserver<string> {
    constructor(observable: Observable<string>, otherObserver: IObserver<string>) {
        this._observable = observable;
        this._otherObserver = otherObserver;
    }

    update() {
        this._observable.removeObserver(this._otherObserver);
    }

    private _otherObserver: IObserver<string>;
    private _observable: Observable<string>;
}

class SecondObserver implements IObserver<string> {
    public update() {
        assert("");
    }
}

describe("Observable", () => {
    it('should not update deleted observers while notifyObservers work', () => {
        const observable = new StringDispatcher();
        const secondObserver = new SecondObserver();
        const firstObserver = new FirstObserver(observable, secondObserver);
        observable.addObserver(firstObserver);
        observable.addObserver(secondObserver);
        observable.notifyObservers();
    });
});
