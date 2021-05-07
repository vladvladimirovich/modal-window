class ModalWindow {
    constructor() {
        if(! ModalWindow.instance) {
            //Init window
            this.init();
            
            //Window is hiden
            this._showed = false;

            //Events
            let body = document.querySelector('body');
            body.addEventListener('keydown', (e) => {
                if (e.key == "Escape") {
                    this.hide()
                }
            });
            this._modalClose.addEventListener('click', (e) => {
                this.hide();
            });
            this._modalWindow.addEventListener('click', (e) => {
                if (!this._modalDialog.contains(e.target)) {
                    this.hide();
                }

            });


            ModalWindow.instance = this;
        }
        return ModalWindow.instance;
    }

    init() {
        //Create elements
        this._modalWindow = document.createElement('div');
        this._modalWindow.setAttribute('class', 'modal');

        this._modalDialog = document.createElement('div');
        this._modalDialog.setAttribute('class', 'modal-dialog');

        this._modalContent = document.createElement('div');
        this._modalContent.setAttribute('class', 'modal-content');

        this._modalHeader = document.createElement('div');
        this._modalHeader.setAttribute('class', 'modal-header');
        
        this._modalTitle = document.createElement('h3');
        this._modalTitle.setAttribute('class', 'modal-title');

        this._modalClose = document.createElement('a');
        this._modalClose.title = "Close";
        this._modalClose.innerHTML = "x";
        this._modalClose.setAttribute('href', '#close');
        this._modalClose.setAttribute('class', 'modal-close')

        this._modalBody = document.createElement('div');
        this._modalBody.setAttribute('class', 'modal-body');
        
        //Combine elements
        this._modalWindow.appendChild(this._modalDialog);
        this._modalDialog.appendChild(this._modalContent);
        this._modalContent.appendChild(this._modalHeader);
        this._modalHeader.appendChild(this._modalTitle);
        this._modalHeader.appendChild(this._modalClose);
        this._modalContent.appendChild(this._modalBody);

        const head = document.querySelector('head');
        const body = document.querySelector('body');
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = 'modalWindow.css';
        
        head.appendChild(styleLink)
        body.appendChild(this._modalWindow);
    }

    changeTitle(str) {
        this._modalTitle.innerText = str;
    }

    addContent(content) {
        this._modalBody.appendChild(content);
    }

    show() {
        if (this._showed == false) {
            this._modalWindow.style.opacity = 1;
            this._showed = true;
        }
    }

    hide() {
        if (this._showed == true) {
            this._modalWindow.style.opacity = 0;
            this._modalWindow.style.pointerEvents = 'none';
            this.showed = false;
        }
    } 
}


const ModalWindowInstance = new ModalWindow();
export default ModalWindowInstance;