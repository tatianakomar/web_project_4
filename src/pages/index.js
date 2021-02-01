import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Card from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js"
import "./index.css";
import { gallerySelector, popupEditUserInfo, popupEditAvatar, popupAddCard, popupOpenCardSelector, popupDeleteCardSelector } from "../components/constants.js";

const userInfo = new UserInfo({ nameSelector: popupEditUserInfo.nameSelector, aboutSelector: popupEditUserInfo.aboutSelector, avatarSelector: popupEditAvatar.avatarSelector });

const profileFormValidator = new FormValidator(validationSettings, popupEditUserInfo.form);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, popupAddCard.form);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationSettings, popupEditAvatar.form);
avatarFormValidator.enableValidation();

const popupOpenCard = new PopupWithImage(popupOpenCardSelector);
popupOpenCard.setEventListeners();

const popupEditUserInfoForm = new PopupWithForm(popupEditUserInfo.selector, { defaultText: "Save", updatingText: "Saving..." }, (formInputs) => {
  // Handle exception in the PopupwithForm.js
  return api.setUserInfo({ name: formInputs.name, about: formInputs.about })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar })
    })
});
popupEditUserInfoForm.setEventListeners();

popupEditUserInfo.button.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  popupEditUserInfo.nameInput.value = profileInfo.name;
  popupEditUserInfo.aboutInput.value = profileInfo.about;
  profileFormValidator.resetFormValidation(false);
  popupEditUserInfoForm.open();
});

const popupEditAvatarForm = new PopupWithForm(popupEditAvatar.selector, { defaultText: "Save", updatingText: "Saving..." }, (formInput) => {
  return api.setUserAvatar({ avatar: formInput.link })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar })
    })
})
popupEditAvatarForm.setEventListeners();

popupEditAvatar.button.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  popupEditAvatar.avatarInput.value = profileInfo.avatar;
  avatarFormValidator.resetFormValidation(false);
  popupEditAvatarForm.open();
})

const openPopupDeleteCard = (cardId, card) => {
  popupDeleteCard.open(cardId, card);
}
const deleteSubmitHandler = (cardId, card) => {
  api.removeCard(cardId)
    .then(() => {
      popupDeleteCard.close();
      card.remove();
      card = null;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err)
    });
}
const popupDeleteCard = new PopupWithSubmit(popupDeleteCardSelector, deleteSubmitHandler);
popupDeleteCard.setEventListeners();

const createCard = ((res, userInfoData) => {
  const card = new Card(res, "#card-template", (link, name) => {
    popupOpenCard.open(link, name);
  }, userInfoData._id, openPopupDeleteCard);
  const cardElement = card.generateCard();
  return cardElement;
})

api.getInitialData()
  .then(([cardsData, userInfoData]) => {
    const cardList = new Section({
      items: cardsData,
      renderer: (item) => {
        const cardElement = createCard(item, userInfoData);
        cardList.addItem(cardElement);
      }
    }, gallerySelector);

    cardList.renderItems();

    userInfo.setUserInfo({ name: userInfoData.name, about: userInfoData.about, avatar: userInfoData.avatar })

    const poopupAddCardForm = new PopupWithForm(popupAddCard.selector, { defaultText: "Create", updatingText: "Creating..." }, (formInputs) => {
      return api.addCard({ name: formInputs.title, link: formInputs.link })
        .then(res => {
          const cardElement = createCard(res, userInfoData);
          cardList.prependItem(cardElement);
        })
    });
    poopupAddCardForm.setEventListeners();

    popupAddCard.button.addEventListener("click", (evt) => {
      popupAddCard.form.reset();
      evt.preventDefault()
      evt.stopPropagation()
      cardFormValidator.resetFormValidation(true);
      poopupAddCardForm.open();
    });

  })