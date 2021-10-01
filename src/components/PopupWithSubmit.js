import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popup = document.querySelector(".popup.popup_type_delete");
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", () => {this._handleFormSubmit(this._cardID, this._element)})
    }

    open(cardID, element) {
        this._cardID = cardID;
        this._element = element;
        super.open();
    }
}