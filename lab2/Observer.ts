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
        for (const [observer, active] of this._observers) {
            if (active) {
                observer.update(this._getObservableData())
            }
        }
        this._clearRemoveList();
    }

    protected abstract _getObservableData() : T

    private _clearRemoveList() {
        for (const observer of this._observersRemoveList) {
            this._observers.delete(observer);
        }
        this._observersRemoveList = [];
    }

    private _observers: Map<IObserver<T>, boolean>;
    private _observersRemoveList: Array<IObserver<T>> = [];
}

export {IObserver};
export {Observable};