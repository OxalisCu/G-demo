import { graphicMsg } from "../graphics/Form.js";

(() => {
    // addGraphic 组件
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    .picker-title{
        padding: 15px 15px 10px;
        display: flex;
        justify-content: space-between;
    }

    .picker-title>span:first-child{
        font-weight: bold;
    }

    .picker-title>span:last-child{
        color: #999;
    }

    .single-picker{
        margin: 0 10px;
    }

    .single-picker>div{
        padding: 8px 0 8px 18px;
        cursor: pointer;
        margin: 5px 0;
        position: relative;
    }

    .single-picker>div.selected{
        background-color: #fff;
    }

    .single-picker>div.selected::before{
        content: "";
        position: absolute;
        top: 0; bottom: 0;
        left: 0;
        width: 5px;
        background-color: #fba;
    }

    .single-picker>div:hover{
        background-color: #ffddd4;
    }

    .cur-choice{
        padding: 15px 15px 10px;
        display: flex;
        justify-content: space-between;
    }

    .cur-choice p{
        margin: 0;
    }

    .cur-choice .tip{
        cursor: pointer;
        font-weight: bold;
    }

    .cur-choice .choice{
        color: #999;
    }

    .form{
        padding: 0 15px;
    }
    
    .form input{
        border: none;
        outline: none;
    }

    .form button{
        border: none;
        display: block;
        cursor: pointer;
    }

    .form>div{
        display: flex;
        align-items: flex-end;
        margin: 12px;
    }

    .form .add-input{
        border: 1px solid #eee;
        border-radius: 5px;
        overflow: hidden;
    }

    .form .add-input>input{
        flex: none;
        width: 65%;
        height: 25px;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .form .add-input>button{
        flex: none;
        width: 35%;
        height: 30px;
    }

    .form .point>span,
    .form .color>span{
        flex: none;
        width: 40%;
    }

    .form .point>input,
    .form .color>input{
        flex: none;
        width: 60%;
        border-bottom: 1px solid #333;
    }

    .form .button{
        display: flex;
        justify-content: space-between;
        margin: 30px 10px 0;
    }

    .form .button>button{
        padding: 5px 12px;
        border-radius: 3px;
    }

    .form .button>button:active{
        background-color: #fba;
    }
    </style>

    <div class="picker-title">
        <span>绘制图形</span>
        <span>单选</span>
    </div>
    <div class="single-picker"></div>
    <div class="cur-choice">
        <p class="tip">填写表单</p>
        <p class="choice"></p>
    </div>
    <div class="form"></div>
    `;

    class GraphicPannel extends HTMLElement {
        // 提供给外部数据
        index; submited; graphic;
        // 不可见
        _picker; _choice; _form;
        constructor() {
            super();
            this._sR = this.attachShadow({ mode: "closed" });
            this._sR.appendChild(template.content.cloneNode(true));

            this._picker = this._sR.querySelector(".single-picker");
            this._choice = this._sR.querySelector(".choice");
            this._form = this._sR.querySelector(".form");

            this.initPicker();
        }

        // 初始化图形选择组件
        initPicker() {
            for (let i = 0; i < graphicMsg.length; i++) {
                const item = document.createElement("div");
                item.innerText = graphicMsg[i].title;
                item.dataset.index = i;
                this._picker.appendChild(item);
            }
            this.refreshPicker(0);
            this._picker.addEventListener("click", (e) => {
                if (!e.target.dataset.index) return;
                this.refreshPicker(Number(e.target.dataset.index));
            });
            this.submited = false;
        }

        // 更新选择
        refreshPicker(index) {
            if (!Number.isInteger(index)) return;

            this.index = index;
            for (let i = 0; i < this._picker.children.length; i++) {
                const item = this._picker.children[i];
                if (i === index) {
                    item.className = "selected";
                } else {
                    item.className = "";
                }
            }
            // 更新当前选择
            this._choice.innerText = graphicMsg[index].type;
            // 更新输入框
            this._form.innerHTML = graphicMsg[index].form;
            // 更新 submit 事件绑定
            this._form.querySelector(".set").addEventListener("click", (e) => {
                this.submited = true;
                this.graphic = graphicMsg[this.index].getForm(this._form);
            });
            // 绑定清空表单事件
            this._form.querySelector(".reset").addEventListener("click", (e) => {
                this.clearForm();
            });
            // 添加输入框
            this._form.querySelector(".add-input>button")?.addEventListener("click", (e) => {
                const num = Number.parseInt(e.currentTarget.parentElement.children[0].value || 0);
                this.addPoints(num);
            });
        }

        // 清空表单
        clearForm(){
            const inputs = this._form.querySelectorAll("input");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
        }

        // 添加输入框
        addPoints(num){
            if(num < 3){
                alert("输入边数需大于等于3");
                return;
            }

            const color = this._form.querySelector(".color");
            const points = this._form.querySelectorAll(".point");
            // 删除原来节点
            for(let i=0; i<points.length; i++){
                this._form.removeChild(points[i]);
            }
            for(let i=0; i<num; i++){
                const point_x = document.createElement("div");
                point_x.className = "point";
                point_x.innerHTML = `
                    <span>x${i}: </span>
                    <input type="number" placeholder="0" />`;
                const point_y = document.createElement("div");
                point_y.className = "point";
                point_y.innerHTML = `
                    <span>y${i}: </span>
                    <input type="number" placeholder="0" />`;
                this._form.insertBefore(point_x, color);
                this._form.insertBefore(point_y, color);
            }
        }
    }

    window.customElements.define("graphic-pannel", GraphicPannel);
})();