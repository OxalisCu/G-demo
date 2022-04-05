/**
 * 图形类
 * 图形属性：顶点、绘制算法、绘制颜色
 */
export class Graphic{
    constructor(){}
    
    isGraphic(){}

    algorithm(){}

    drawBorder(){}
}


/**
 * 直线
 */
export class Line extends Graphic{
    line;
    constructor(x0 = 0, y0 = 0, x1 = 0, y1 = 0, color = "blue"){
        super();
        this.line = {};
        this.line.x0 = x0;
        this.line.y0 = y0;
        this.line.x1 = x1;
        this.line.y1 = y1;
        this.line.color = color;
    }

    isGraphic(){
        return this.line && (this.line.x0 !== this.line.x1 || this.line.y0 !== this.line.y1) && this.line.color;
    }

    algorithm(){}

    drawBorder(){}
}

/**
 * 圆
 */
export class Circle extends Graphic{
    circle;
    constructor(x0 = 0, y0 = 0, radius = 0, color = "blue"){
        super();
        this.circle = {};
        this.circle.x0 = x0;
        this.circle.y0 = y0;
        this.circle.radius = radius;
        this.circle.color = color;
    }

    isGraphic(){
        return this.circle && this.circle.radius && this.circle.color;
    }

    algorithm(){}

    drawBorder(){}
}

/**
 * 矩形
 */
export class Rectangle extends Graphic{
    rectangle;
    constructor(xmin = 0, ymin = 0, xmax = 0, ymax = 0, color = "blue"){
        super();
        this.rectangle = {};
        this.rectangle.xmin = xmin;
        this.rectangle.ymin = ymin;
        this.rectangle.xmax = xmax;
        this.rectangle.ymax = ymax;
        this.rectangle.color = color;
    }

    isGraphic(){
        return this.rectangle && this.rectangle.xmin !== this.rectangle.xmax && this.rectangle.ymin !== this.rectangle.ymax && this.rectangle.color;
    }

    algorithm(){}

    drawBorder(){}
}

/**
 * 多边形
 */
export class Polygon extends Graphic{
    polygon;
    constructor(num = 0, vertexces = [], color = "blue"){
        super();
        this.polygon = {};
        this.polygon.num = num;
        this.polygon.vertexces = vertexces;
        this.polygon.color = color;
    }

    isGraphic(){
        let flag = false;
        for(let i=0; i<this.polygon.num; i++){
            if(this.polygon.vertexces[i].x && this.polygon.vertexces[i].y){
                flag = true;
                break;
            }
        }
        return this.polygon && flag && this.polygon.num > 2 && this.polygon.color;
    }

    algorithm(){}

    drawBorder(){}
}