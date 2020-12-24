import { initialCards, Card } from "./Card.js";
import { openPopup, closePopup, validationSettings } from "./utils.js";
import { FormValidator } from "./FormValidator.js"

const gallery = document.querySelector(".gallery");
// Show Card Popup
const addNewCardButton = document.querySelector(".profile__btn-add");
const addNewCardPopup = document.querySelector(".popup.popup_type_add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const cardTitleInput = document.querySelector("#title-input");
const cardLinkInput = document.querySelector("#link-input");
// Edit Profile
const editProfileButton = document.querySelector(".profile__btn-edit");
const editProfilePopup = document.querySelector(".popup.popup_type_edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input")
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

const cardFormValidator = new FormValidator(validationSettings, cardForm);
cardFormValidator.enableValidation();
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const createCard = (item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    return cardElement;
}
initialCards.forEach((item) => {
    const cardElement = createCard(item)
    gallery.append(cardElement);
});
// Open Creating Card Popup
addNewCardButton.addEventListener("click", (evt) => {
    cardForm.reset();
    evt.preventDefault()
    evt.stopPropagation()
    cardFormValidator.resetFormValidation(true);
    openPopup(addNewCardPopup);
});
// Create New Card
cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardElement = createCard({
        link: cardLinkInput.value,
        title: cardTitleInput.value
    });
    gallery.prepend(cardElement);
    closePopup();
});
// Open Edit Profile Popup
editProfileButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    profileNameInput.value = nameProfile.textContent;
    profileJobInput.value = jobProfile.textContent;
    profileFormValidator.resetFormValidation(false);
    openPopup(editProfilePopup);
});
// Save New Profile
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = profileNameInput.value;
    jobProfile.textContent = profileJobInput.value;
    closePopup();
});