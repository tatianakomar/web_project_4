export const gallerySelector = ".gallery";

export const popupEditUserInfo = {
    selector: ".popup.popup_type_edit",
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    button: document.querySelector(".profile__btn-edit"),
    form: document.querySelector(".popup_type_edit .popup__form"),
    nameInput: document.querySelector("#name-input"),
    aboutInput: document.querySelector("#about-input")
}

export const popupEditAvatar = {
    selector: ".popup.popup_type_avatar",
    avatarSelector: ".profile__avatar",
    button: document.querySelector(".profile__avatar"),
    form: document.querySelector(".popup_type_avatar .popup__form"),
    avatarInput: document.querySelector("#avatar-input")
}

export const popupAddCard = {
    selector: ".popup.popup_type_add",
    button: document.querySelector(".profile__btn-add"),
    form: document.querySelector(".popup_type_add .popup__form")
}

export const popupOpenCardSelector = ".popup.popup_type_card";

export const popupDeleteCardSelector = ".popup.popup_type_delete";