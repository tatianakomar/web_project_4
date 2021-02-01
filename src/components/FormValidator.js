export const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};
export class FormValidator {
    constructor(validationSettings, form) {
        this._validationSettings = validationSettings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector))
        this._submitButton = this._form.querySelector(this._validationSettings.submitButtonSelector);
    }
    _showInputError = (input) => {
        input.classList.add(this._validationSettings.inputErrorClass);
        input.nextElementSibling.textContent = input.validationMessage;
        input.nextElementSibling.classList.add(this._validationSettings.errorClass);
    };

    _hideInputError = (input) => {
        input.classList.remove(this._validationSettings.inputErrorClass);
        input.nextElementSibling.textContent = "";
    };

    _showHideInputError = (inputSelector) => {
        const isNotValid = !inputSelector.validity.valid;
        isNotValid ? this._showInputError(inputSelector) : this._hideInputError(inputSelector);
    };

    _checkValidationInputs = (inputSelectors) => inputSelectors.some((inputSelector) => {
        return !inputSelector.checkValidity()
    })

    _toggleButtonState = (button, isDisabled) => {
        button.disabled = isDisabled;
        isDisabled ? button.classList.add(this._validationSettings.inactiveButtonClass) : button.classList.remove(this._validationSettings.inactiveButtonClass);
    };

    resetFormValidation = (disableButton) => {
        this._inputList.forEach((input) => {
            this._hideInputError(input);
            this._toggleButtonState(this._submitButton, disableButton);
        });
    }

    enableValidation() {
        this._inputList.forEach((inputSelector) => {
            inputSelector.addEventListener("input", () => {
                this._showHideInputError(inputSelector);
                const isNotValid = this._checkValidationInputs(this._inputList);
                this._toggleButtonState(this._submitButton, isNotValid);
            });
        });

    };
}