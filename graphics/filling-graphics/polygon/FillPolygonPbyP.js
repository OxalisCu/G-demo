import { Polygon, Rectangle } from "../../Graphic.js";

class Point{
    x; y;
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

export class FillPolygonPbyP extends Polygon{
    constructor(...args){
        super(...args);
    }

    algorithm(canvas, index){
        if(!canvas || !this.isGraphic()){
            alert("绘制失败");
            return;
        }

        const poly = this.polygon;
        const color = this.polygon.color;

        // 算法正文
        const minRect = this.getMinRect();
        // 逐点判断是否在多边形内部
        for(let j=minRect.ymin; j<=minRect.ymax; j++){
            for(let i=minRect.xmin; i<=minRect.xmax; i++){
                const point = new Point(i, j);
                if(this.isInPolygon(point)){
                    canvas.writePixel(point.x, point.y, color);
                }
            }
        }

        // 标注信息
        canvas.writeText(poly.vertexces[0].x, poly.vertexces[0].y, `多边形${index}`);
        if(canvas.border){
            this.drawBorder(canvas);
        }
    }

    // 获取多边形的最小包含矩形
    getMinRect(){
        const poly = this.polygon;
        const minRect = new Rectangle(poly.vertexces[0].x, poly.vertexces[0].x, poly.vertexces[0].y, poly.vertexces[0].y);
        for(let i=1; i<poly.num; i++){
            if(minRect.rectangle.xmin > poly.vertexces[i].x) minRect.rectangle.xmin = poly.vertexces[i].x;
            if(minRect.rectangle.ymin > poly.vertexces[i].y) minRect.rectangle.ymin = poly.vertexces[i].y;
            if(minRect.rectangle.xmax < poly.vertexces[i].x) minRect.rectangle.xmax = poly.vertexces[i].x;
            if(minRect.rectangle.ymax < poly.vertexces[i].y) minRect.rectangle.ymax = poly.vertexces[i].y;
        }
        return minRect.rectangle;
    }

    // 射线法（向左）判断点是否位于多边形内
    isInPolygon(point){
        const poly = this.polygon;
        let inSide = false;
        // 遍历每条边，判断多边形是否与之相交
        // 判断顺序为 第n条、第1条、第2条 ... 第n-1条
        // j 是前一条，i 是后一条
        for(let i=0, j=poly.num-1; i<poly.num; j=i, i++){
            let m, p1, p2;
            if(poly.vertexces[j].y < poly.vertexces[i].y){
                p1 = poly.vertexces[j];
                p2 = poly.vertexces[i];
            }else{
                p1 = poly.vertexces[i];
                p2 = poly.vertexces[j];
            }
            // 这样判断会导致两边交点不绘制
            if(p1.y <= point.y && p2.y > point.y){
                m = (p1.x - p2.x) / (p1.y - p2.y);
                // 判断是否相交
                if(Math.ceil(p1.x + (point.y - p1.y)*m) > point.x){
                    inSide = !inSide;
                }
            }
        }

        return inSide;
    }

    drawBorder(canvas){
        const poly = this.polygon;
        for(let i=0, j=poly.num-1; i<poly.num; j=i, i++){
            canvas.writeLine(poly.vertexces[j].x, poly.vertexces[j].y, poly.vertexces[i].x, poly.vertexces[i].y, "red");
        }
    }
}