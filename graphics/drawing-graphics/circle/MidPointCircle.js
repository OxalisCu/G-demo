import { Circle } from "../../Graphic.js";

export class MidPointCircle extends Circle{
    constructor(...args){
        super(...args);
    }

    algorithm(canvas, index){
        if(!canvas || !this.isGraphic()){
            alert("绘制失败");
            return;
        }

        let x0 = this.circle.x0,
            y0 = this.circle.y0,
            radius = this.circle.radius,
            color = this.circle.color;

        // 算法正文
        let x = 0, y = radius;
        let d = 5 - 4*radius;
        let deltaE = 12;
        let deltaSE = 20 - 8*radius;
        this.writeCircle(x0, y0, x, y, color, canvas);
        while(y > x){
            if(d <= 0){     // 取像素 E
                d += deltaE;
                deltaSE += 8;
            }else{      // 取像素 SE
                d += deltaSE;
                deltaSE += 16;
                y--;
            }
            deltaE += 8;
            x++;
            this.writeCircle(x0, y0, x, y, color, canvas);
        }

        // 标注信息
        canvas.writeText(x0, y0, `圆${index}`);
        if(canvas.border){
            this.drawBorder(canvas);
        }
    }

    // 八分圆，画对称点
    writeCircle(x0, y0, x, y, color, canvas){
        canvas.writePixel(x+x0, y+y0, color);
        canvas.writePixel(-x+x0, y+y0, color);
        canvas.writePixel(x+x0, -y+y0, color);
        canvas.writePixel(-x+x0, -y+y0, color);
        if(x !== y){
            canvas.writePixel(y+x0, x+y0, color);
            canvas.writePixel(-y+x0, x+y0, color);
            canvas.writePixel(y+x0, -x+y0, color);
            canvas.writePixel(-y+x0, -x+y0, color);
        }
    }

    drawBorder(canvas){
        canvas.writeCircle(this.circle.x0, this.circle.y0, this.circle.radius, "red");
    }
}