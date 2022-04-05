import { LineDDA } from "../graphics/drawing-graphics/line/LineDDA.js";
import { MidPointLine } from "../graphics/drawing-graphics/line/MidPointLine.js";
import { MidPointCircle } from "../graphics/drawing-graphics/circle/MidPointCircle.js";
import { FillRectangle } from "../graphics/filling-graphics/rectangle/FillRectangle.js";
import { FillPolygonPbyP } from "../graphics/filling-graphics/polygon/FillPolygonPbyP.js";
import { ScanLineFill } from "../graphics/filling-graphics/polygon/ScanLineFill.js";

// 直线
const lineForm = `
    <div class="point">
        <span>x0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>x1: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y1: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="color">
        <span>color: </span>
        <input type="text" placeholder="blue" />
    </div>
    <div class="button">
        <button class="reset">清空表单</button>
        <button class="set">添加图形</button>
    </div>`;

const getLineDDA = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const x0 = Number.parseInt(points[0].value || 0);
    const y0 = Number.parseInt(points[1].value || 0);
    const x1 = Number.parseInt(points[2].value || 0);
    const y1 = Number.parseInt(points[3].value || 0);
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new LineDDA(x0, y0, x1, y1, color);
}

const getMidPointLine = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const x0 = Number.parseInt(points[0].value || 0);
    const y0 = Number.parseInt(points[1].value || 0);
    const x1 = Number.parseInt(points[2].value || 0);
    const y1 = Number.parseInt(points[3].value || 0);
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new MidPointLine(x0, y0, x1, y1, color);
}

// 圆
const circleForm = `
    <div class="point">
        <span>x0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>radius: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="color">
        <span>color: </span>
        <input type="text" placeholder="blue" />
    </div>
    <div class="button">
        <button class="reset">清空表单</button>
        <button class="set">添加图形</button>
    </div>`;

const getMidPointCircle = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const x0 = Number.parseInt(points[0].value || 0);
    const y0 = Number.parseInt(points[1].value || 0);
    const radius = Number.parseInt(points[2].value || 0);
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new MidPointCircle(x0, y0, radius, color);
}

// 矩形
const rectangleForm = `
    <div class="point">
        <span>xmin: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>ymin: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>xmax: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>ymax: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="color">
        <span>color: </span>
        <input type="text" placeholder="blue" />
    </div>
    <div class="button">
        <button class="reset">清空表单</button>
        <button class="set">添加图形</button>
    </div>`;

const getFillRectangle = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const xmin = Number.parseInt(points[0].value || 0);
    const ymin = Number.parseInt(points[1].value || 0);
    const xmax = Number.parseInt(points[2].value || 0);
    const ymax = Number.parseInt(points[3].value || 0);
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new FillRectangle(xmin, ymin, xmax, ymax, color);
}

// 多边形
const polygonForm = `
    <div class="add-input">
        <input type="number" placeholder="0" />
        <button class="add">边数</button>
    </div>
    <div class="point">
        <span>x0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y0: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>x1: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y1: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>x2: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="point">
        <span>y2: </span>
        <input type="number" placeholder="0" />
    </div>
    <div class="color">
        <span>color: </span>
        <input type="text" placeholder="blue" />
    </div>
    <div class="button">
        <button class="reset">清空表单</button>
        <button class="set">添加图形</button>
    </div>`;

const getFillPolygonPbyP = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const vertexces = [];
    for(let i=0; i<points.length; i+=2){ 
        vertexces[i/2] = {
            x: Number.parseInt(points[i].value || 0),
            y: Number.parseInt(points[i+1].value || 0)
        };
    }
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new FillPolygonPbyP(vertexces.length, vertexces, color);
}

const getScanLineFill = function (form) {
    const points = form.querySelectorAll(".point>input[type=number]");
    const vertexces = [];
    for(let i=0; i<points.length; i+=2){ 
        vertexces[i/2] = {
            x: Number.parseInt(points[i].value || 0),
            y: Number.parseInt(points[i+1].value || 0)
        };
    }
    const color = form.querySelector(".color>input[type=text]").value || "blue";
    return new ScanLineFill(vertexces.length, vertexces, color);
}

// 图形信息
export const graphicMsg = [
    {
        title: "直线绘制 - DDA 算法",
        type: "LineDDA",
        form: lineForm,
        getForm: getLineDDA
    },
    {
        title: "直线绘制 - 中点线算法",
        type: "MidPointLine",
        form: lineForm,
        getForm: getMidPointLine
    },
    {
        title: "圆绘制 - 中点圆算法",
        type: "MidPointCircle",
        form: circleForm,
        getForm: getMidPointCircle
    },
    {
        title: "矩形填充 - 矩形填充算法",
        type: "FillRectangle",
        form: rectangleForm,
        getForm: getFillRectangle
    },
    {
        title: "多边形填充 - 逐点填充算法",
        type: "FillPolygonPbyP",
        form: polygonForm,
        getForm: getFillPolygonPbyP
    },
    {
        title: "多边形填充 - 扫描线算法",
        type: "ScanLineFill",
        form: polygonForm,
        getForm: getScanLineFill
    },
];