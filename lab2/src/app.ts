import {WhetherData} from "./WhetherData";
import {StatisticsDisplay} from "./WhetherData";

const wd: WhetherData = new WhetherData();
const display: StatisticsDisplay =  new StatisticsDisplay();
wd.addObserver(display);
wd.setMeasurements(3, 0.7, 760);
wd.setMeasurements(4, 0.8, 761);
wd.removeObserver(display);
wd.setMeasurements(10, 0.8, 761);
wd.setMeasurements(-10, 0.8, 761);