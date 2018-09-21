"use strict";
exports.__esModule = true;
var typescript_map_1 = require("typescript-map");
var Observable = /** @class */ (function () {
    function Observable() {
        this._observers = new typescript_map_1.TSMap();
        this._observersRemoveList = [];
    }
    Observable.prototype.addObserver = function (observer) {
        this._observers.set(observer, true);
    };
    Observable.prototype.removeObserver = function (observer) {
        this._observers.set(observer, false);
        this._observersRemoveList.push(observer);
    };
    Observable.prototype.notifyObservers = function () {
        var observers = this._observers.keys();
        for (var _i = 0, observers_1 = observers; _i < observers_1.length; _i++) {
            var observer = observers_1[_i];
            if (this._observers.get(observer)) {
                observer.update(this._getObservableData());
            }
        }
        ;
        this._clearRemoveList();
    };
    Observable.prototype._clearRemoveList = function () {
        for (var _i = 0, _a = this._observersRemoveList; _i < _a.length; _i++) {
            var observer = _a[_i];
            this._observers["delete"](observer);
        }
        this._observersRemoveList = [];
    };
    return Observable;
}());
exports.Observable = Observable;
