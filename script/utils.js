const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const openPopup = (modal) => {
    modal.classList.add("popup_open");
    document.addEventListener("keydown", escapeButton);
-document.addEventListener("click", mouseClick);
}
const closePopup = (modal) => {
    const openedPopup = document.querySelector(".popup_open");
    openedPopup.classList.remove("popup_open");
    document.removeEventListener("keydown", escapeButton);
    document.removeEventListener("click", mouseClick);
}
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        closePopup();
    });
});

const escapeButton = (evt) => {
    if (evt.key === "Escape") {
        closePopup();
    }
}

const mouseClick = (evt) => {
    if (!evt.target.closest(".popup__content") && !evt.target.closest(".popup__content_content_card")) {
        closePopup();
    }
}

const hideInputError = (input) => {
    input.classList.remove(validationSettings.inputErrorClass);
    input.nextElementSibling.classList.remove(validationSettings.errorClass);
    input.nextElementSibling.textContent = "";
};

const setDisabledButton = (button, isDisabled) => {
    button.disabled = isDisabled;
    isDisabled ? button.classList.add(validationSettings.inactiveButtonClass) : button.classList.remove(validationSettings.inactiveButtonClass);
};

export {openPopup, closePopup, hideInputError, validationSettings, setDisabledButton};