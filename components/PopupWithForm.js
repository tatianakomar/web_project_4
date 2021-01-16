import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._handleFormSubmit = (evt)=>{
            handleFormSubmit(evt);
            this.close()};
        this._form = this._popup.querySelector(".popup__form");
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        })
    }

    setEventListeners = () => {
        this._form.addEventListener("submit", this._handleFormSubmit);
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        this._form.removeEventListener("submit", this._handleFormSubmit);
        super.close();
    }
}