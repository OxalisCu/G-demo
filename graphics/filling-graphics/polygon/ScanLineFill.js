import { Polygon } from "../../Graphic.js";

// 边的数据结构
class Edge{
    constructor(ymax, x, delta_x){
        this.ymax = ymax;
        this.x = x;
        this.delta_x = delta_x;
    }
}

export class ScanLineFill extends Polygon{
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
        // 初始化 ET
        const et = this.initET();

        // 开始扫描线算法
        let scanLine;       // 扫描线
        for(let i=0; i<et.length; i++){   // 确定扫描线开始点
            if(et[i] !== undefined && scanLine === undefined){
                scanLine = i;
                break;
            }
        }
        let scanEnd = 0;        // 扫描线最高点
        for(let i=0; i<et[et.length-1].length; i++){
            const ymax = et[et.length-1][i].ymax;
            scanEnd = scanEnd<ymax ? ymax : scanEnd;
        }
        let ael = [];     // 活动边表
        while(scanLine <= scanEnd){
            // 新的边插入
            if(et[scanLine]){
                for(let i=0; i<et[scanLine].length; i++){
                    const item = et[scanLine][i];
                    ael.push(new Edge(item.ymax, item.x, item.delta_x));
                }
            }
            // 按 x 重新排序
            ael.sort((a, b) => a.x-b.x);
            // 根据 ael 对边的端点匹配，取整，填充
            for(let i=0; i<ael.length; i+=2){
                const x1 = Math.ceil(ael[i].x);
                const x2 = Number.isInteger(ael[i+1].x) ? ael[i+1].x-1 : Math.ceil(ael[i+1].x);
                // 填充两匹配点之间的线型区域
                for(let j=x1; j<=x2; j++){
                    canvas.writePixel(j, scanLine, color);
                }
            }
            // 扫描线上移
            scanLine += 1;
            // 脱离的边删除
            ael = ael.filter((item) => {
                return item.ymax !== scanLine;
            });
            // 将 ael 中每一条边的 x 递增 delta_x
            for(let i=0; i<ael.length; i++){
                ael[i].x += ael[i].delta_x;
            }
        }

        // 标注信息
        canvas.writeText(poly.vertexces[0].x, poly.vertexces[0].y, `多边形${index}`);
        if(canvas.border){
            this.drawBorder(canvas);
        }
    }

    // 建立 边的分类表 ET
    initET(){
        const poly = this.polygon;
        const et = [];
        // 遍历每条边，放入边的分类表
        for(let i=0, j=poly.num-1; i<poly.num; j=i, i++){
            // 去除水平边
            if(poly.vertexces[j].y === poly.vertexces[i].y) continue;
            let m, p1, p2;
            // 保证 p1 在 p2 之下
            if(poly.vertexces[j].y < poly.vertexces[i].y){
                p1 = poly.vertexces[j];
                p2 = poly.vertexces[i];
            }else{
                p1 = poly.vertexces[i];
                p2 = poly.vertexces[j];
            }
            if(et[p1.y] === undefined){
                et[p1.y] = [];
            }
            et[p1.y].push(new Edge(p2.y, p1.x, (p1.x - p2.x)/(p1.y - p2.y)));
        }

        console.log(et);

        return et;
    }

    drawBorder(canvas){
        const poly = this.polygon;
        for(let i=0, j=poly.num-1; i<poly.num; j=i, i++){
            canvas.writeLine(poly.vertexces[j].x, poly.vertexces[j].y, poly.vertexces[i].x, poly.vertexces[i].y, "red");
        }
    }
}