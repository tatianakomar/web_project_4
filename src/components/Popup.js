export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
    }

    open() {
        this._popup.classList.add("popup_open");
        document.addEventListener("keyup", this._handleEscClose);
        document.addEventListener("click", this._mouseClick);
    }

    close() {
        this._popup.classList.remove("popup_open");
        document.removeEventListener("keyup", this._handleEscClose);
        document.removeEventListener("click", this._mouseClick);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _mouseClick = (evt) => {
        if (!evt.target.closest(".popup__content") && !evt.target.closest(".popup__content_content_card")) {
            this.close();
        }
    }
}