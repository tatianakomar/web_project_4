import Popup from "./Popup.js";
const popupCardImage = document.querySelector(".popup__image");
const popupCardTitle = document.querySelector(".popup__card-title");

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, title) {
        popupCardImage.src = link;
        popupCardImage.alt = title;
        popupCardTitle.textContent = title;

        super.open();
    }
}