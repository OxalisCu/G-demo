import {Line} from "../../Graphic.js";

export class LineDDA extends Line{
    constructor(...args){
        super(...args);
    }

    algorithm(canvas, index){
        if(!canvas || !this.isGraphic()){
            alert("绘制失败");
            return;
        }

        let x0 = this.line.x0,
            y0 = this.line.y0,
            x1 = this.line.x1,
            y1 = this.line.y1,
            color = this.line.color;

        // 算法正文
        let dx, dy;
        let k = (y1-y0)/(x1-x0);
        if(Math.abs(k) <= 1){     // 斜率绝对值小于1
            // 交换位置，保证坐标轴 x0<x1
            if(x0 > x1){
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            dx = x1 - x0;
            dy = y1 - y0;
            let y = y0;
            for(let x=x0; x<x1; x++){
                canvas.writePixel(x, Math.round(y), color);
                y += dy/dx;
            }
        }else{      // 斜线绝对值大于1
            // 交换位置，保证坐标轴 y0<y1
            if(y0 > y1){
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            dx = x1 - x0;
            dy = y1 - y0;
            let x = x0;
            for(let y=y0; y<y1; y++){
                canvas.writePixel(Math.round(x), y, color);
                x += dx/dy;
            }
        }

        // 标注信息
        canvas.writeText(x0, y0, `直线${index}`);
        if(canvas.border){
            this.drawBorder(canvas);
        }
    }

    drawBorder(canvas){
        canvas.writeLine(this.line.x0, this.line.y0, this.line.x1, this.line.y1, "red");
    }
}