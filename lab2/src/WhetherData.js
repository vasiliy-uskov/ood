"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Observer_1 = require("./Observer");
var WhetherInfo = /** @class */ (function () {
    function WhetherInfo(temperature, humidity, pressure) {
        this.humidity = humidity;
        this.temperature = temperature;
        this.pressure = pressure;
    }
    return WhetherInfo;
}());
var Statistics = /** @class */ (function () {
    function Statistics() {
        this._minValue = Infinity;
        this._maxValue = -Infinity;
        this._accValue = 0.;
        this._accCount = 0;
    }
    Statistics.prototype.addValue = function (value) {
        if (value < this._minValue) {
            this._minValue = value;
        }
        if (value > this._maxValue) {
            this._maxValue = value;
        }
        this._accValue += value;
        ++this._accCount;
    };
    Statistics.prototype.minValue = function () {
        return this._minValue;
    };
    Statistics.prototype.maxValue = function () {
        return this._minValue;
    };
    Statistics.prototype.average = function () {
        return this._accCount ? this._accValue / this._accCount : 0;
    };
    return Statistics;
}());
var StatisticsDisplay = /** @class */ (function () {
    function StatisticsDisplay() {
        this._temperatureStatistics = new Statistics();
        this._humidityStatistics = new Statistics();
        this._pressureStatistics = new Statistics();
    }
    StatisticsDisplay.prototype.update = function (data) {
        this._temperatureStatistics.addValue(data.temperature);
        this._humidityStatistics.addValue(data.humidity);
        this._pressureStatistics.addValue(data.pressure);
        this.displayStatistics("Temp", this._temperatureStatistics);
        this.displayStatistics("Pressure", this._pressureStatistics);
        this.displayStatistics("Humidity", this._humidityStatistics);
    };
    StatisticsDisplay.prototype.displayStatistics = function (statisticsName, statistics) {
        console.log("Max", statisticsName, statistics.maxValue());
        console.log("Min", statisticsName, statistics.minValue());
        console.log("Average", statisticsName, statistics.average());
        console.log("--------");
    };
    return StatisticsDisplay;
}());
exports.StatisticsDisplay = StatisticsDisplay;
var WhetherData = /** @class */ (function (_super) {
    __extends(WhetherData, _super);
    function WhetherData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._temperature = 0.;
        _this._humidity = 0.;
        _this._pressure = 750.;
        return _this;
    }
    WhetherData.prototype.temperature = function () {
        return this._temperature;
    };
    WhetherData.prototype.humidity = function () {
        return this._humidity;
    };
    WhetherData.prototype.pressure = function () {
        return this._pressure;
    };
    WhetherData.prototype.measurementsChanged = function () {
        this.notifyObservers();
    };
    WhetherData.prototype.setMeasurements = function (temperature, humidity, pressure) {
        this._humidity = humidity;
        this._temperature = temperature;
        this._pressure = pressure;
        this.measurementsChanged();
    };
    WhetherData.prototype._getObservableData = function () {
        return new WhetherInfo(this.temperature(), this.humidity(), this.pressure());
    };
    return WhetherData;
}(Observer_1.Observable));
exports.WhetherData = WhetherData;
