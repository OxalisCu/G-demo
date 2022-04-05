
(()=>{
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .logo{
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            margin: 0;
            font-weight: normal;
        }

        .logo::selection{
            background-color: transparent;
            color: #fff;
        }
        </style>

        <h1 class="logo"></h1>
    `;

    class HeadLogo extends HTMLElement{
        constructor(){
            super();

            this._sR = this.attachShadow({mode: "closed"});
            this._sR.appendChild(template.content.cloneNode(true));
        }

        static get observedAttributes() {
            return ["title"]; 
        }

        get titleVal(){
            return this.getAttribute("title");
        }

        set titleVal(val){
            this._sR.querySelector(".logo").textContent = val;
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            if(name === "title"){
                this.titleVal = newValue;
            }
        }
    }

    window.customElements.define("head-logo", HeadLogo);
})()