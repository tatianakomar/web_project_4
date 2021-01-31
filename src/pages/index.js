import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Card from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js"
import "./index.css";

const gallerySelector = ".gallery";
const popupSelector = ".popup.popup_type_card";

const popupEditSelector = ".popup.popup_type_edit"
const editProfileButton = document.querySelector(".profile__btn-edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input");

const popupAddCardSelector = ".popup.popup_type_add";
const addNewCardButton = document.querySelector(".profile__btn-add");
const cardForm = document.querySelector(".popup_type_add .popup__form");

const popupAvatarSelector = ".popup.popup_type_avatar";
const editUserAvatar = document.querySelector(".profile__avatar");
const avatarForm = document.querySelector(".popup_type_avatar .popup__form");
const profileAvatarInput = document.querySelector("#avatar-input");

const popupDeleteCardSelector = ".popup.popup_type_delete";

const userInfo = new UserInfo({ nameSelector: ".profile__name", aboutSelector: ".profile__job", avatarSelector: ".profile__avatar" });
const popupWithImage = new PopupWithImage(popupSelector);
popupWithImage.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditSelector, { defaultText: "Save", updatingText: "Saving..." }, (formInputs) => {
  return api.setUserInfo({ name: formInputs.name, about: formInputs.about })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar })
    });
});
popupEditForm.setEventListeners();

const deleteSubmitHandler = (cardId, card) => {
  api.removeCard(cardId)
    .then(() => {
      popupDeleteCard.close();
      card.remove();
      card = null;
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupDeleteCard = new PopupWithSubmit(popupDeleteCardSelector, deleteSubmitHandler);
popupDeleteCard.setEventListeners();

const openPopupDeleteCard = (cardId, card) => {
  popupDeleteCard.open(cardId, card);
}

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, cardForm);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();

api.getInitialData()
  .then(([cardsData, userInfoData]) => {
    const cardList = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, "#card-template", (link, name) => {
          popupWithImage.open(link, name);
        }, userInfoData._id, openPopupDeleteCard);

        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    }, gallerySelector);

    cardList.renderItems();

    userInfo.setUserInfo({ name: userInfoData.name, about: userInfoData.about, avatar: userInfoData.avatar })

    const poopupCardForm = new PopupWithForm(popupAddCardSelector, { defaultText: "Create", updatingText: "Creating..." }, (formInputs) => {
      return api.addCard({ name: formInputs.title, link: formInputs.link })
        .then(res => {
          const card = new Card(res, "#card-template", (link, name) => {
            popupWithImage.open(link, name);
          }, userInfoData._id, openPopupDeleteCard);
          const cardElement = card.generateCard();
          cardList.prependItem(cardElement);
        })
    });

    poopupCardForm.setEventListeners();

    addNewCardButton.addEventListener("click", (evt) => {
      cardForm.reset();
      evt.preventDefault()
      evt.stopPropagation()
      cardFormValidator.resetFormValidation(true);
      poopupCardForm.open();
    });

  })

editProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileJobInput.value = profileInfo.about;
  profileFormValidator.resetFormValidation(false);
  popupEditForm.open();
});

const popupAvatarForm = new PopupWithForm(popupAvatarSelector, { defaultText: "Save", updatingText: "Saving..." }, (formInput) => {
  return api.setUserAvatar({ avatar: formInput.link })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar })
    })
})
popupAvatarForm.setEventListeners();

editUserAvatar.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  profileAvatarInput.value = profileInfo.avatar;
  avatarFormValidator.resetFormValidation(false);
  popupAvatarForm.open();

})