import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js"

const gallerySelector = ".gallery";
const popupSelector = ".popup.popup_type_card";
const popupEditSelector = ".popup.popup_type_edit"
const editProfileButton = document.querySelector(".profile__btn-edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

const addNewCardButton = document.querySelector(".profile__btn-add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const popupAddCardSelector = ".popup.popup_type_add";
const cardTitleInput = document.querySelector("#title-input");
const cardLinkInput = document.querySelector("#link-input");

const popupWithImage = new PopupWithImage(popupSelector);
const popupEditForm = new PopupWithForm(popupEditSelector, (evt) => {
  // Update profile
  evt.preventDefault();
  nameProfile.textContent = profileNameInput.value;
  jobProfile.textContent = profileJobInput.value;
});
const poopupCardForm = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  const card = new Card({
    link: cardLinkInput.value,
    title: cardTitleInput.value
  }, "#card-template", (link, title) => {
    popupWithImage.open(link, title);
  });
  const cardElement = card.generateCard();
  cardList.prependItem(cardElement);
})
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, cardForm);
cardFormValidator.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", (link, title) => {
      popupWithImage.open(link, title);
    });

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, gallerySelector);

cardList.renderItems();

editProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  profileNameInput.value = nameProfile.textContent;
  profileJobInput.value = jobProfile.textContent;
  profileFormValidator.resetFormValidation(false);
  popupEditForm.open();
});

addNewCardButton.addEventListener("click", (evt) => {
  cardForm.reset();
  evt.preventDefault()
  evt.stopPropagation()
  cardFormValidator.resetFormValidation(true);
  poopupCardForm.open();
});

