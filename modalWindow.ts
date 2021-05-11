enum Keys {
    Esc = "Escape",
    Ctrl = "Ctrl"
}

class ModalWindow {

    private static instance : ModalWindow;
    
    private showed: boolean;
    private modalWindow: HTMLElement;
    private modalDialog: HTMLElement;
    private modalContent: HTMLElement;
    private modalHeader: HTMLElement;
    private modalTitle: HTMLElement;
    private modalClose: HTMLElement;
    private modalBody: HTMLElement;
    
    private constructor() {
        this.initElements();
        this.initEvents();
        this.showed = false;


    }

    public static getInstance(): ModalWindow {
        if (!ModalWindow.instance) {
            ModalWindow.instance = new ModalWindow();
        }

        return ModalWindow.instance;
    }

    public initElements(): void {
        //Create elements
        this.modalWindow = document.createElement('div');
        this.modalWindow.setAttribute('class', 'modal');

        this.modalDialog = document.createElement('div');
        this.modalDialog.setAttribute('class', 'modal-dialog');

        this.modalContent = document.createElement('div');
        this.modalContent.setAttribute('class', 'modal-content');

        this.modalHeader = document.createElement('div');
        this.modalHeader.setAttribute('class', 'modal-header');
        
        this.modalTitle = document.createElement('h3');
        this.modalTitle.setAttribute('class', 'modal-title');

        this.modalClose = document.createElement('a');
        this.modalClose.title = "Close";
        this.modalClose.innerHTML = "x";
        this.modalClose.setAttribute('href', '#close');
        this.modalClose.setAttribute('class', 'modal-close')

        this.modalBody = document.createElement('div');
        this.modalBody.setAttribute('class', 'modal-body');

        //Combine elements
        this.modalWindow.appendChild(this.modalDialog);
        this.modalDialog.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalHeader.appendChild(this.modalTitle);
        this.modalHeader.appendChild(this.modalClose);
        this.modalContent.appendChild(this.modalBody);

        const head = document.querySelector('head');
        const body = document.querySelector('body');
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = 'modalWindow.css';
        
        head.appendChild(styleLink)
        body.appendChild(this.modalWindow);
    }

    public initEvents(): void {
        let body = document.querySelector('body');
            body.addEventListener('keydown', (e) => {
                if (e.key == Keys.Esc) {
                    this.hide()
                }
            });
            // TODO: check native events
            this.modalClose.addEventListener('click', (e) => {
                this.hide();
            });
            this.modalWindow.addEventListener('click', (e) => {
                if (!this.modalDialog.contains(e.target as Element)) {
                    this.hide();
                }

            });
    }
    
    public show(): void {
        if (this.showed == false) {
            this.modalWindow.style.opacity = '1';
            this.showed = true;
        }
    }

    public hide(): void {
        if (this.showed == true) {
            this.modalWindow.style.opacity = '0';
            this.modalWindow.style.pointerEvents = 'none';
            this.showed = false;
        }
    }

    public disableCloseButton(): void {
        this.modalClose.style.pointerEvents = 'none';
        this.modalClose.style.opacity = '0';
    }

    addContent(content: HTMLElement): void {
        this.modalBody.appendChild(content);
    }

    changeTitle(str: string): void {
        this.modalTitle.innerText = str;
    }
}

const ModalWindowInstance = ModalWindow.getInstance();

export default ModalWindowInstance; 