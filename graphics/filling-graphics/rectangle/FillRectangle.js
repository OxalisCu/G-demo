import { Rectangle } from "../../Graphic.js";

export class FillRectangle extends Rectangle{
    constructor(...args){
        super(...args);
    }

    algorithm(canvas, index){
        if(!canvas || !this.isGraphic()){
            alert("绘制失败");
            return;
        }

        let xmin = this.rectangle.xmin,
            ymin = this.rectangle.ymin,
            xmax = this.rectangle.xmax,
            ymax = this.rectangle.ymax,
            color = this.rectangle.color;

        // 算法正文
        if(xmin > xmax){
            [xmin, xmax] = [xmax, xmin];
        }
        if(ymin > ymax){
            [ymin, ymax] = [ymax, ymin];            
        }
        // 处理共享边界，左闭右开、下闭上开
        for(let i=xmin; i<xmax; i++){
            for(let j=ymin; j<ymax; j++){
                canvas.writePixel(i, j, color);
            }
        }

        // 标注信息
        canvas.writeText(xmax, ymax, `矩形${index}`);
        if(canvas.border){
            this.drawBorder(canvas);
        }
    }

    drawBorder(canvas){
        canvas.writeRect(this.rectangle.xmin, this.rectangle.ymin, this.rectangle.xmax, this.rectangle.ymax, "red");
    }
}