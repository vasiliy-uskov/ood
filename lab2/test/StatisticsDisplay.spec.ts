import {StatisticsDisplay, WhetherInfo} from "../src/WhetherData";
import {expect} from "chai";
import {Observable} from "../src/Observer";


class IdDispatcher extends Observable<WhetherInfo> {
    constructor(id) {
        super();
        this._id = id;
    }
    protected _getObservableData() {
        return new WhetherInfo(0, 0, 0, this._id);
    }

    _id: string;
}

const nativeLog = console.log;
let loggedMessages = [];
const mockLof = () => {
    console.log = function(...messages) {
        nativeLog(...messages);
        let message = "";
        for (let i = 0; i < messages.length; ++i) {
            message += (i == 0 ? "" : " ") + messages[i];
        }
        loggedMessages.push(message);
    };
};

const unmockLog = () => {
    console.log = nativeLog;
};

describe("StatisticsDisplay", () => {
    beforeEach(() => {
        loggedMessages = [];
    });
    it("should log all dispatch station", () => {
        const id1Dispatcher = new IdDispatcher("id1");
        const id2Dispatcher = new IdDispatcher("id2");
        const statisticsDisplay = new StatisticsDisplay();
        id1Dispatcher.addObserver(statisticsDisplay);
        id2Dispatcher.addObserver(statisticsDisplay);
        mockLof();
        id1Dispatcher.notifyObservers();
        id2Dispatcher.notifyObservers();
        unmockLog();
        console.log(loggedMessages);
        expect(loggedMessages).to.deep.equal([
            "Max Temp id1 0",
            "Min Temp id1 0",
            "Average Temp id1 0",
            "--------",
            "Max Pressure id1 0",
            "Min Pressure id1 0",
            "Average Pressure id1 0",
            "--------",
            "Max Humidity id1 0",
            "Min Humidity id1 0",
            "Average Humidity id1 0",
            "--------",
            "Max Temp id2 0",
            "Min Temp id2 0",
            "Average Temp id2 0",
            "--------",
            "Max Pressure id2 0",
            "Min Pressure id2 0",
            "Average Pressure id2 0",
            "--------",
            "Max Humidity id2 0",
            "Min Humidity id2 0",
            "Average Humidity id2 0",
            "--------",
        ])
    });
});
