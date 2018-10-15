import {Observable} from "./Observer";
import {IObserver} from "./Observer";
import {TSMap} from "typescript-map";

class WhetherInfo {
    constructor(temperature: number, humidity: number, pressure: number, id: string) {
        this.humidity = humidity;
        this.temperature = temperature;
        this.pressure = pressure;
        this._id = id
    }

    id(): string {
        return this._id;
    }

    public _id: string;
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
        this._initStatistic(data.id());
        const temperatureStatistics = this._temperatureStatistics.get(data.id());
        const humidityStatistics = this._humidityStatistics.get(data.id());
        const pressureStatistics = this._pressureStatistics.get(data.id());
        temperatureStatistics.addValue(data.temperature);
        humidityStatistics.addValue(data.humidity);
        pressureStatistics.addValue(data.pressure);
        this.displayStatistics(`Temp ${data.id()}`, temperatureStatistics);
        this.displayStatistics(`Pressure ${data.id()}`, pressureStatistics);
        this.displayStatistics(`Humidity ${data.id()}`, humidityStatistics);
    }

    public displayStatistics(statisticsName: string, statistics: Statistics) {
        console.log("Max", statisticsName, statistics.maxValue());
        console.log("Min", statisticsName, statistics.minValue());
        console.log("Average", statisticsName, statistics.average());
        console.log("--------");
    }

    _initStatistic(id: string) {
        for (const statistics of [this._humidityStatistics, this._temperatureStatistics, this._pressureStatistics]) {
            if (!statistics.has(id)) {
                statistics.set(id, new Statistics());
            }
        }
    }

    private _temperatureStatistics: TSMap<string, Statistics> = new TSMap();
    private _humidityStatistics: TSMap<string, Statistics> = new TSMap();
    private _pressureStatistics: TSMap<string, Statistics> = new TSMap();
}

class WhetherData extends Observable<WhetherInfo> {
    constructor(name: string) {
        super();
        this._name = name;
    }

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
        return new WhetherInfo(this.temperature(), this.humidity(), this.pressure(), this._name);
    }

    private _name: string;
    private _temperature: number = 0.;
    private _humidity: number = 0.;
    private _pressure: number = 750.;
}

export {WhetherData};
export {WhetherInfo};
export {StatisticsDisplay};