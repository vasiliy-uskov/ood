import {Observable} from "./Observer";
import {IObserver} from "./Observer";

class WhetherInfo {
    constructor(temperature: number, humidity: number, pressure: number) {
        this.humidity = humidity;
        this.temperature = temperature;
        this.pressure = pressure;
    }
    public temperature: number;
    public humidity: number;
    public pressure: number;
}

class Statistics {
    public addValue(value: number) {
        if (value < this._minValue) {
            this._minValue = value
        }
        if (value > this._maxValue) {
            this._maxValue = value
        }
        this._accValue += value;
        ++this._accCount;
    }

    public minValue(): number {
        return this._minValue;
    }

    public maxValue(): number {
        return this._minValue;
    }

    public average(): number {
        return this._accCount ? this._accValue / this._accCount : 0;
    }

    private _minValue: number = Infinity;
    private _maxValue: number = -Infinity;
    private _accValue: number = 0.;
    private _accCount: number = 0;
}

class StatisticsDisplay implements IObserver<WhetherInfo> {
    public update(data: WhetherInfo) {
        this._temperatureStatistics.addValue(data.temperature);
        this._humidityStatistics.addValue(data.humidity);
        this._pressureStatistics.addValue(data.pressure);
        this.displayStatistics("Temp", this._temperatureStatistics);
        this.displayStatistics("Pressure", this._pressureStatistics);
        this.displayStatistics("Humidity", this._humidityStatistics);
    }

    public displayStatistics(statisticsName: string, statistics: Statistics) {
        console.log("Max", statisticsName, statistics.maxValue());
        console.log("Min", statisticsName, statistics.minValue());
        console.log("Average", statisticsName, statistics.average());
        console.log("--------");
    }

    public _temperatureStatistics: Statistics = new Statistics();
    public _humidityStatistics: Statistics = new Statistics();
    public _pressureStatistics: Statistics = new Statistics();
}

class WhetherData extends Observable<WhetherInfo> {
    public temperature(): number {
        return this._temperature;
    }

    public humidity(): number {
        return this._humidity;
    }

    public pressure(): number {
        return this._pressure;
    }

    public measurementsChanged() {
        this.notifyObservers();
    }

    public setMeasurements(temperature: number, humidity: number, pressure: number) {
        this._humidity = humidity;
        this._temperature = temperature;
        this._pressure = pressure;
        this.measurementsChanged();
    }

    protected _getObservableData() {
        return new WhetherInfo(this.temperature(), this.humidity(), this.pressure());
    }
    private _temperature: number = 0.;
    private _humidity: number = 0.;
    private _pressure: number = 750.;
}

export {WhetherData};
export {StatisticsDisplay};