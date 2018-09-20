import { TSMap } from "typescript-map"

interface IObserver<T> {
    update(data: T):void;
}

abstract class Observable<T> {
    public addObserver(observer: IObserver<T>) {
        this._observers.set(observer, true);
    }

    public removeObserver(observer: IObserver<T>) {
        this._observers.set(observer, false);
        this._observersRemoveList.push(observer);
    }

    public notifyObservers() {
        const observers = this._observers.keys();
        for (const observer of observers) {
            if (this._observers.get(observer)) {
                observer.update(this._getObservableData());
            }
        };
        this._clearRemoveList();
    }

    protected abstract _getObservableData() : T

    private _clearRemoveList() {
        for (const observer of this._observersRemoveList) {
            this._observers.delete(observer);
        }
        this._observersRemoveList = [];
    }

    private _observers: TSMap<IObserver<T>, boolean> = new TSMap();
    private _observersRemoveList: Array<IObserver<T>> = [];
}

export {IObserver};
export {Observable};