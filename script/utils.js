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

export {openPopup, closePopup};