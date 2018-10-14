import {Canvas} from "./Canvas";
import {Painter} from "./Pinter";
import {Designer} from "./Designer";
import {ShapeFactory} from "./ShapeFactory";

const canvas = new Canvas(50, 50);
const painter = new Painter();
const designer = new Designer(new ShapeFactory());
painter.drawPicture(designer.createDraft([
    {
        type: "ellipse",
        color: 0,
        center: {x: 1, y: 1},
        radiusX: 1,
        radiusY: 1
    },
    {
        type: "triangle",
        color: 1,
        vertex1: {x: 0, y: 1},
        vertex2: {x: 1, y: 0},
        vertex3: {x: 0, y: 0},
    },
    {
        type: "rectangle",
        color: 1,
        vertex1: {x: 1, y: 1},
        vertex2: {x: 2, y: 2},
    },
    {
        type: "polygon",
        color: 1,
        vertexes: [
            {x: 0, y: 1},
            {x: 2, y: 3},
            {x: 4, y: 5},
            {x: 6, y: 7},
            {x: 8, y: 9},
            {x: 9, y: 8},
            {x: 7, y: 6}
        ]
    }
]), canvas);

console.log(canvas.getPicture());