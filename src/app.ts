import {SvgCanvas} from "./SvgCanvas";
import {Painter} from "./Pinter";
import {Designer} from "./Designer";
import {ShapeFactory} from "./ShapeFactory";

const canvas = new SvgCanvas(50, 50);
const painter = new Painter();
const designer = new Designer(new ShapeFactory());
painter.drawPicture(designer.createDraft([
    {
        type: "ellipse",
        color: 0,
        center: {x: 20, y: 20},
        radiusX: 10,
        radiusY: 10
    },
    {
        type: "triangle",
        color: 1,
        vertex1: {x: 0, y: 20},
        vertex2: {x: 20, y: 0},
        vertex3: {x: 0, y: 0},
    },
    {
        type: "rectangle",
        color: 1,
        vertex1: {x: 0, y: 0},
        vertex2: {x: 20, y: 20},
    },
    {
        type: "polygon",
        color: 1,
        vertexes: [
            {x: 0, y: 10},
            {x: 10, y: 10},
            {x: 10, y: 20},
            {x: 20, y: 20},
            {x: 20, y: 0},
        ]
    }
]), canvas);
console.log(canvas.getPicture());