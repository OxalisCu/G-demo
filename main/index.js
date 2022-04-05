import * as DrawBoard from "../components/DrawBoard.js";
import * as HeadLogo from "../components/HeadLogo.js";
import * as GraphicPannel from "../components/GraphicPannel.js";
import * as CanvasPannel from "../components/CanvasPannel.js";

window.onload = function(){
    // 获取组件 dom
    const drawBoard = document.getElementsByTagName("draw-board")[0];
    const graphicPannel = document.getElementsByTagName("graphic-pannel")[0];
    const canvasPannel = document.getElementsByTagName("canvas-pannel")[0];

    canvasPannel.initPannel(
        {
            xmax: drawBoard.xmax,
            ymax: drawBoard.ymax,
            unit: drawBoard.unit
        },
        {...drawBoard.cut}
    );

    // 画布中存在的图形
    const graphics = [];

    // 监听图形面板的提交按钮
    const timer1 = setInterval(()=>{
        if(graphicPannel.submited){
            graphics.push(graphicPannel.graphic);
            drawBoard.draw(graphicPannel.graphic, graphics.length);
            graphicPannel.submited = false;
        }
    }, 500);

    // 监听画布面板的提交按钮
    const timer2 = setInterval(()=>{
        if(canvasPannel.submited){
            drawBoard.setting(canvasPannel.canvasSetting, canvasPannel.cutSetting);
            canvasPannel.submited = false;
        }
    }, 500);
}