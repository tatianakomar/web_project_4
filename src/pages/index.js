import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Card from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
// import { initialCards } from "../utils/constants.js"
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import api from "../components/api.js"

const gallerySelector = ".gallery";
const popupSelector = ".popup.popup_type_card";
const popupEditSelector = ".popup.popup_type_edit"
const editProfileButton = document.querySelector(".profile__btn-edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input");

const addNewCardButton = document.querySelector(".profile__btn-add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const popupAddCardSelector = ".popup.popup_type_add";

const popupDeleteCardSelector = ".popup.popup_type_delete";

// const userInfo = new UserInfo({ nameSelector: ".profile__name", jobSelector: ".profile__job" });
const popupWithImage = new PopupWithImage(popupSelector);
popupWithImage.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditSelector, (formInputs) => {
  userInfo.setUserInfo(formInputs.name, formInputs.job);
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

    const userInfo = new UserInfo({ nameSelector: ".profile__name", jobSelector: ".profile__job" });
    userInfo.setUserInfo({ nameValue: userInfoData.name, jobValue: userInfoData.about })

    const poopupCardForm = new PopupWithForm(popupAddCardSelector, (formInputs) => {
      api.addCard({ name: formInputs.title, link: formInputs.link })
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


// api.getUserInfo()
// .then(res => {
//   const userInfo = new UserInfo({
//     nameSelector: ".profile__name", jobSelector: ".profile__job" 
//   });
// })



// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const card = new Card(item, "#card-template", (link, title) => {
//       popupWithImage.open(link, title);
//     });

//     const cardElement = card.generateCard();
//     cardList.addItem(cardElement);
//   }
// }, gallerySelector);

// cardList.renderItems();

editProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileJobInput.value = profileInfo.job;
  profileFormValidator.resetFormValidation(false);
  popupEditForm.open();
});