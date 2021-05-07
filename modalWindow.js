class ModalWindow {
    constructor() {
        if(! ModalWindow.instance) {
            this.init();

            this._showed = false;

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
    }

    addContent(content) {
        this.content = content;
        this.container.appendChild(content);
    }

    show() {
        if (this._showed == false) {
            const head = document.querySelector('head');
            const body = document.querySelector('body');
            const styleLink = document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = 'modalWindow.css';
            
            head.appendChild(styleLink)
            body.appendChild(this._modalWindow);
            
            this.showed = true;
        }
    }
}

const ModalWindowInstance = new ModalWindow();
export default ModalWindowInstance;