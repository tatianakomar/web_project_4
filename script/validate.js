const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const checkValidationInputs = (inputSelectors) => inputSelectors.some((inputSelector) => {
    return !inputSelector.checkValidity()
})

const showInputError = (input) => {
    input.classList.add(validationSettings.inputErrorClass);
    input.nextElementSibling.textContent = input.validationMessage;
    input.nextElementSibling.classList.add(validationSettings.errorClass);
};

const hideInputError = (input) => {
    input.classList.remove(validationSettings.inputErrorClass);
    input.nextElementSibling.classList.remove(validationSettings.errorClass);
    input.nextElementSibling.textContent = "";
};

const showHideInputError = (inputSelector) => {
    const isNotValid = !inputSelector.validity.valid;
    isNotValid ? showInputError(inputSelector) : hideInputError(inputSelector);
};

const setDisabledButton = (button, isDisabled) => {
    button.disabled = isDisabled;
    isDisabled ? button.classList.add(validationSettings.inactiveButtonClass) : button.classList.remove(validationSettings.inactiveButtonClass);
};

const enableValidation = (validationSettingParams) => {
    const formSelectors = Array.from(document.querySelectorAll(validationSettingParams.formSelector))
    formSelectors.forEach((form) => {
        const inputSelectors = Array.from(form.querySelectorAll(validationSettingParams.inputSelector))
        const submitButtonSelector = form.querySelector(validationSettingParams.submitButtonSelector);
        inputSelectors.forEach((inputSelector) => {
            inputSelector.addEventListener("input", () => {
                showHideInputError(inputSelector);
                const isNotValid = checkValidationInputs(inputSelectors);
                setDisabledButton(submitButtonSelector, isNotValid);
            });
        });
    });

}
enableValidation(validationSettings);