
(()=>{
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .draw-board{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            overflow: auto;
        }

        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        .draw-board::-webkit-scrollbar{
            width: 8px;
            height: 8px;
            background-color: #F5F5F5;
        }
        
        /*定义滚动条轨道 内阴影+圆角*/
        .draw-board::-webkit-scrollbar-track{
            border-radius: 10px;
            background-color: #F5F5F5;
        }
        
        /*定义滑块 内阴影+圆角*/
        .draw-board::-webkit-scrollbar-thumb{
            border-radius: 10px;
            background-color: #bbb;
        }

        .canvas{}

        .scale{
            position: fixed;
            right: 280px;
            top: 80px;
            background-color: #fff;
            display: flex;
            align-items: center;
            border-radius: 5px;
        }

        .scale div::selection{
            background-color: #fff;
            color: #000;
        }

        .scale div{
            padding: 8px 5px;
            font-size: 15px;
            cursor: pointer;
        }

        .scale div:hover{
            background-color: #f9f9f9;
        }
        </style>

        <div class="draw-board">
            <canvas class="canvas"></canvas>
            <div class="scale">
                <div class="bigger" title="放大">➕</div>
                <div class="smaller" title="缩小">➖</div>
                <div class="reset" title="重置">🧷</div>
            </div>
        </div>
    `;

    class DrawBoard extends HTMLElement{
        // 通过 访问器属性 访问
        _xmax; _ymax; _unit;
        // 可以访问到的变量
        line; border;  // 初始化时是否绘制单元格、绘图时是否描边
        scale; base_x; base_y;    // 坐标轴
        // 裁剪设置
        cut = {
            xmin: 10,
            ymin: 10,
            xmax: 110,
            ymax: 70
        };
        // 私有变量
        _width; _height;
        _canvas; _ctx; _scale;

        // 默认值
        default = {
            line: 0,
            point: 0,
            color: "blue",
            fontColor: "black",
            fontHeight: 0
        }

        constructor(){
            super();

            this._sR = this.attachShadow({mode: "closed"});
            this._sR.appendChild(template.content.cloneNode(true));
            
            this._canvas = this._sR.querySelector(".canvas");
            this._ctx = this._canvas.getContext("2d");
            this._scale = this._sR.querySelector(".scale");
        }

        static get observedAttributes() {
            return ["xmax", "ymax", "unit", "scale", "line", "border"];
        }
    
        // 参数初始化
        attributeChangedCallback(name, oldValue, newValue) {
            this[name] = Number(newValue);
            console.log(name, this[name]);
        }

        // 画布初始化
        connectedCallback(){
            this.initCanvas();
            this.initScale();
        }

        // 对属性做一次拦截
        get xmax(){
            return this._xmax;
        }

        set xmax(val){
            this._xmax = val;
            // 坐标系信息
            this.base_x = Math.ceil(val/2);
            this._width = val*this._unit;
        }

        get ymax(){
            return this._ymax;
        }

        set ymax(val){
            this._ymax = val;
            // 坐标系信息
            this.base_y = Math.ceil(val/2);
            this._height = val*this._unit;
        }

        get unit(){
            return this._unit;
        }

        set unit(val){
            this._unit = val;
            // 坐标系信息
            this._width = this._xmax*val;
            this._height = this._ymax*val;
            this.default.fontHeight = 1.5*val;
            this.default.line = val/4;
            this.default.point = val/2;
        }

        // 初始化 canvas
        initCanvas(){
            const width = this._width*this.scale, height = this._height*this.scale, xmax = this.xmax, ymax = this.ymax;
            const canvas = this._canvas, ctx = this._ctx;

            // 去除模糊
            let dpr = window.devicePixelRatio 
                || window.webkitDevicePixelRatio
                || window.mozDevicePixelRatio 
                || 1;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = Math.round(width*dpr);
            canvas.height = Math.round(height*dpr);

            ctx.scale(dpr, dpr);

            if(this.line){
                // 绘制网格线
                for(let i=-xmax; i<=xmax; i++){
                    this.writeLine(i, -ymax, i, ymax, "#bbb", this.unit/8);
                }
                for(let i=-ymax; i<=ymax; i++){
                    this.writeLine(-xmax, i, xmax, i, "#bbb", this.unit/8);
                }
            }else{
                // 绘制网格点
                for(let i=-xmax; i<=xmax; i++){
                    for(let j=-ymax; j<ymax; j++){
                        this.writePixel(i, j, "#bbb", this.unit/8);
                    }
                }
            }

            // 绘制原点
            this.writePixel(0, 0, "red", this.unit/2);
            this.writeText(-4, 0, "原点");
        }

        // 清空 canvas
        clearCanvas(){
            this.ctx.width = this.ctx.width;
            this.initCanvas();
        }

        // 绘制图形
        draw(graphic, index){
            console.log(graphic, index);
            // 裁剪
            // 描边
            // 绘制
            graphic.algorithm(this, index);
        }

        // 更改画布设置
        setting(canvasSetting, cutSetting){
            console.log(canvasSetting, cutSetting);

            this.xmax = canvasSetting.xmax;
            this.ymax = canvasSetting.ymax;
            this.unit = canvasSetting.unit;

            this.cut = {...cutSetting};

            this.initCanvas();
        }

        // canvas 方法
        // 画点
        writePixel(x, y, color, point){
            const ctx = this._ctx;
            const base_x = this.base_x, base_y = this.base_y, scale = this.scale, unit = this.unit;
            ctx.strokeStyle = color || this.default.color;
            ctx.fillStyle = color || this.default.color;
            point = point || this.default.point;
            ctx.beginPath();
            ctx.arc((base_x+x)*unit*scale, (base_y-y)*unit*scale, point*scale, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // 画线
        writeLine(x0, y0, x1, y1, color, line){
            const ctx = this._ctx;
            const base_x = this.base_x, base_y = this.base_y, scale = this.scale, unit = this.unit;
            ctx.strokeStyle = color || this.default.color;
            ctx.lineWidth = line || this.default.line*scale;
            ctx.beginPath();
            ctx.moveTo((base_x+x0)*unit*scale, (base_y-y0)*unit*scale);
            ctx.lineTo((base_x+x1)*unit*scale, (base_y-y1)*unit*scale);
            ctx.closePath();
            ctx.stroke();
        }

        // 画圆
        writeCircle(x0, y0, radius, color, line){
            const ctx = this._ctx;
            const base_x = this.base_x, base_y = this.base_y, scale = this.scale, unit = this.unit;
            ctx.strokeStyle = color || this.default.color;
            ctx.lineWidth = line || this.default.line*scale;
            ctx.beginPath();
            ctx.arc((base_x+x0)*unit*scale, (base_y-y0)*unit*scale, radius*this.unit*scale, 0, 2*Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        // 画矩形
        writeRect(x0, y0, x1, y1, color, line){
            if(x0 > x1){
                [x0, x1] = [x1, x0];
                [y0, y1] = [y1, y0];
            }
            const ctx = this._ctx;
            const base_x = this.base_x, base_y = this.base_y, scale = this.scale, unit = this.unit;
            ctx.strokeStyle = color || this.default.color;
            ctx.lineWidth = line || this.default.line*scale;
            ctx.beginPath();
            ctx.rect((base_x+x0)*unit*scale, (base_y-y0)*unit*scale, (x1-x0)*unit*scale, -(y1-y0)*unit*scale);
            ctx.closePath();
            ctx.stroke();
        }

        // 标注
        writeText(x, y, text, color, height){
            const ctx = this._ctx;
            const base_x = this.base_x, base_y = this.base_y, scale = this.scale, unit = this.unit;
            ctx.strokeStyle = color || this.default.fontColor;
            ctx.fillStyle = color || this.default.fontColor;
            height = height || this.default.fontHeight*scale;
            ctx.font = `${height}px Arial`;
            ctx.beginPath();
            ctx.fillText(text, (base_x+x)*unit*scale, (base_y-y)*unit*scale);
            ctx.closePath();
            ctx.stroke();
        }

        // 初始化 scale
        initScale(){
            this._scale.querySelector(".bigger").addEventListener("click", (e) => {
                this.scaleBigger();
            });
            this._scale.querySelector(".smaller").addEventListener("click", (e) => {
                this.scaleSmaller();
            });
            this._scale.querySelector(".reset").addEventListener("click", (e) => {
                this.scaleReset();
            });
        }

        scaleBigger(){
            this.scale += 0.1;
            this.initCanvas();
        }

        scaleSmaller(){
            if(this.scale - 0.1 > 0){
                this.scale -= 0.1;
                this.initCanvas();
            }
        }

        scaleReset(){
            this.scale = 1;
            this.initCanvas();
        }
    }

    window.customElements.define("draw-board", DrawBoard);
})()