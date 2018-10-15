import {WhetherData} from "./WhetherData";
import {StatisticsDisplay} from "./WhetherData";

const wdIn: WhetherData = new WhetherData("in");
const wdOut: WhetherData = new WhetherData("out");
const display: StatisticsDisplay =  new StatisticsDisplay();
wdIn.addObserver(display);
wdOut.addObserver(display);
wdIn.setMeasurements(3, 0.7, 760);
wdOut.setMeasurements(4, 0.8, 761);
