import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = document.querySelector(".popup__image");
        this._popupCardTitle = document.querySelector(".popup__card-title");
    }

    open(link, title) {
        this._popupCardImage.src = link;
        this._popupCardImage.alt = title;
        this._popupCardTitle.textContent = title;

        super.open();
    }
}