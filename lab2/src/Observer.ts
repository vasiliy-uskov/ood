import { TSMap } from "typescript-map"

interface IObserver<T> {
    update(data: T):void;
}

abstract class Observable<T> {
    public addObserver(observer: IObserver<T>, priority: number = this._greaterPriority) {
        this._greaterPriority = priority > this._greaterPriority ? priority : this._greaterPriority;
        this._observers.set(observer, {
            active: true,
            priority,
        });
    }

    public removeObserver(observer: IObserver<T>) {
        this._observers.get(observer).active = false;
        this._observersRemoveList.push(observer);
    }

    public notifyObservers() {
        const sortedObservers = this._observers.keys().slice();
        sortedObservers.sort((observer1: IObserver<T>, observer2: IObserver<T>) => {
            const priority1 = this._observers.get(observer1).priority;
            const priority2 = this._observers.get(observer2).priority;
            return priority1 > priority2 ? 1 : (priority1 == priority2 ? 0 : -1);
        });
        for (const observer of sortedObservers) {
            if (this._observers.get(observer).active) {
                observer.update(this._getObservableData());
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

    private _observers: TSMap<IObserver<T>, {active: boolean, priority: number}> = new TSMap();
    private _observersRemoveList: Array<IObserver<T>> = [];
    private _greaterPriority: number = 0;
}

export {IObserver};
export {Observable};