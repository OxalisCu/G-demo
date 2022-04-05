(()=>{
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    .pannel-title{
        padding: 15px 15px 10px;
        display: flex;
        justify-content: space-between;
    }

    .pannel-title>span:first-child{
        font-weight: bold;
    }

    .pannel-title>span:last-child{
        color: #999;
    }

    .pannel{
        padding: 0 15px;
    }

    input{
        border: none;
        outline: none;
    }

    button{
        border: none;
        display: block;
    }

    .pannel .item{
        display: flex;
        align-items: flex-end;
        margin: 12px;
    }

    .pannel .item>span{
        flex: none;
        width: 40%;
    }

    .pannel .item>input{
        flex: none;
        width: 60%;
        border-bottom: 1px solid #333;
    }

    .button{
        display: flex;
        justify-content: space-between;
        margin: 30px 22px 0;
    }

    .button>button{
        padding: 5px 12px;
        border-radius: 3px;
        cursor: pointer;
    }

    .button>button:active{
        background-color: #fba;
    }
    </style>

    <div class="pannel-title">
        <span>画布设置</span>
        <span>⚙️</span>
    </div>
    <div class="pannel canvas">
        <div class="item">
            <span>xmax: </span>
            <input type="number" placeholder=""/>
        </div>
        <div class="item">
            <span>ymax: </span>
            <input type="number" placeholder=""/>
        </div>
        <div class="item">
            <span>unit: </span>
            <input type="number" placeholder=""/>
        </div>
    </div>
    <div class="pannel-title">
        <span>裁剪设置</span>
        <span>⚙️</span>
    </div>
    <div class="pannel cut">
        <div class="item">
            <span>xmin: </span>
            <input type="number" placeholder=""/>
        </div>
        <div class="item">
            <span>ymin: </span>
            <input type="number" placeholder=""/>
        </div>
        <div class="item">
            <span>xmax: </span>
            <input type="number" placeholder=""/>
        </div>
        <div class="item">
            <span>ymax: </span>
            <input type="number" placeholder=""/>
        </div>
    </div>
    <div class="button">
        <button class="reset">置为默认</button>
        <button class="set">修改设置</button>
    </div>`;

    class CanvasPannel extends HTMLElement{
        // 提供给外部数据
        submited; canvasSetting; cutSetting;
        default;    // 默认值
        // 不可见
        _canvasPannel; _cutPannel; _button;
        constructor(){
            super();
            this._sR = this.attachShadow({mode: "closed"});
            this._sR.appendChild(template.content.cloneNode(true));

            this._canvasPannel = this._sR.querySelector(".canvas.pannel");
            this._cutPannel = this._sR.querySelector(".cut.pannel");
            this._button = this._sR.querySelector(".button");
        }

        // 初始化
        initPannel(canvasSetting, cutSetting){
            this.default = {
                canvasSetting: {...canvasSetting},
                cutSetting: {...cutSetting}
            };

            // 初始化输入框默认值
            const canvasInputs = this._canvasPannel.querySelectorAll(".item>input[type=number]");
            const cutInputs = this._cutPannel.querySelectorAll(".item>input[type=number]");
            canvasInputs[0].placeholder = canvasSetting.xmax;
            canvasInputs[1].placeholder = canvasSetting.ymax;
            canvasInputs[2].placeholder = canvasSetting.unit;
            cutInputs[0].placeholder = cutSetting.xmin;
            cutInputs[1].placeholder = cutSetting.ymin;
            cutInputs[2].placeholder = cutSetting.xmax;
            cutInputs[3].placeholder = cutSetting.ymax;

            // 绑定 submit 事件
            this._button.querySelector(".set").addEventListener("click", (e)=>{
                this.submited = true;
                this.refreshPannel();
            });
            // 绑定重置事件
            this._button.querySelector(".reset").addEventListener("click", (e) => {
                this.clearPannel();
            });
        }

        // 更新 pannel
        refreshPannel(){
            const canvasInputs = this._canvasPannel.querySelectorAll(".item>input[type=number]");
            const cutInputs = this._cutPannel.querySelectorAll(".item>input[type=number]");
            this.canvasSetting = {
                xmax: Number.parseInt(canvasInputs[0].value || this.default.canvasSetting.xmax),
                ymax: Number.parseInt(canvasInputs[1].value || this.default.canvasSetting.ymax),
                unit: Number.parseInt(canvasInputs[2].value || this.default.canvasSetting.unit)
            }; 
            this.cutSetting = {
                xmin: Number.parseInt(cutInputs[0].value || this.default.cutSetting.xmin),
                ymin: Number.parseInt(cutInputs[1].value || this.default.cutSetting.ymin),
                xmax: Number.parseInt(cutInputs[2].value || this.default.cutSetting.xmax),
                ymax: Number.parseInt(cutInputs[3].value || this.default.cutSetting.ymax)
            };
            this.submited = true;
        }

        // 重置 pannel
        clearPannel(){
            const inputs = this._sR.querySelectorAll("input");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
            this.canvasSetting = {...this.default.canvasSetting};
            this.cutSetting = {...this.default.cutSetting};
            this.submited = true;
        }
    }

    window.customElements.define("canvas-pannel", CanvasPannel);
})();