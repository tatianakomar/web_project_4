import {hideInputError, setDisabledButton} from "./utils.js"

class FormValidator {
    constructor(validationSettings, form) {
        this._validationSettings = validationSettings;
        this._form = form;
    }
    _showInputError = (input) => {
        input.classList.add(this._validationSettings.inputErrorClass);
        input.nextElementSibling.textContent = input.validationMessage;
        input.nextElementSibling.classList.add(this._validationSettings.errorClass);
    };
    _showHideInputError = (inputSelector) => {
        const isNotValid = !inputSelector.validity.valid;
        isNotValid ? this._showInputError(inputSelector) : hideInputError(inputSelector);
    };

    _checkValidationInputs = (inputSelectors) => inputSelectors.some((inputSelector) => {
        return !inputSelector.checkValidity()
    })
    enableValidation(){
        const inputSelectors = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector))
        const submitButtonSelector = this._form.querySelector(this._validationSettings.submitButtonSelector);
        inputSelectors.forEach((inputSelector) => {
            inputSelector.addEventListener("input", () => {
                this._showHideInputError(inputSelector);
                const isNotValid = this._checkValidationInputs(inputSelectors);
                setDisabledButton(submitButtonSelector, isNotValid);
            });
        });

    };
}

export {FormValidator}