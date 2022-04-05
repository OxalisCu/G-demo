import {Line} from "../../Graphic.js";

export class MidPointLine extends Line{
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
        let a, b;
        let d1, d2, d;
        let x, y;

        // 交换位置，保证坐标轴 x0<x1
        if(x0 > x1){
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }
        b = x1 - x0;
        a = y0 - y1;
        x = x0;
        y = y0;

        let k = (y1-y0)/(x1-x0);
        if(Math.abs(k) <= 1){       // 斜率绝对值小于等于1
            if(0<=k && k<=1){        // 斜率在 [0, 1]
                d = 2*a + b;
                d1 = 2*a;
                d2 = 2*(a + b);
                canvas.writePixel(x, y, color);
                while(x < x1){
                    if(d < 0){
                        x++;
                        y++;
                        d += d2;
                    }else{
                        x++;
                        d += d1;
                    }
                    canvas.writePixel(x, y, color);
                }
            }else{          // 斜率在 [-1, 0)
                d = 2*a - b;
                d1 = 2*a;
                d2 = 2*(a - b);
                canvas.writePixel(x, y, color);
                while(x < x1){
                    if(d < 0){
                        x++;
                        d += d1;
                    }else{
                        x++;
                        y--;
                        d += d2;
                    }
                    canvas.writePixel(x, y, color);
                }
            }
        }else{      // 斜线绝对值大于1
            if(k === Infinity){      // 斜率为正无穷
                while(y <= y1){
                    canvas.writePixel(x, y, color);
                    y++;
                }
            }else if(k === -Infinity){
                while(y >= y1){
                    canvas.writePixel(x, y, color);
                    y--;
                }
            }else if(1<k){      // 斜率在 (1, oo)
                d = a + 2*b;
                d1 = 2*(a + b);
                d2 = 2*b;
                canvas.writePixel(x, y, color);
                while(y < y1){
                    if(d < 0){
                        y++;
                        d += d2;
                    }else{
                        x++;
                        y++;
                        d += d1;
                    }
                    canvas.writePixel(x, y, color);
                }
            }else{          // 斜率在 (-oo, -1)
                d = a - 2*b;
                d1 = -2*b;
                d2 = 2*(a - b);
                canvas.writePixel(x, y, color);
                while(y > y1){
                    if(d < 0){
                        x++;
                        y--;
                        d += d2;
                    }else{
                        y--;
                        d += d1;
                    }
                    canvas.writePixel(x, y, color);
                }
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