import {openPopup} from "./utils.js";

// Initial Cards
const initialCards = [{
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
},
{
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
},
{
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
{
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
},
{
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
}
];

const popupCardImage = document.querySelector(".popup__image");
const popupCardTitle = document.querySelector(".popup__card-title");
const cardPopup = document.querySelector(".popup.popup_type_card");

class Card {
    constructor(data, cardSelector) {
        this._title = data.title;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__title").textContent = this._title;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".card__image").addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this._handleOpenPopup();
        });

        const likeButton = this._element.querySelector(".card__btn-like");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__btn-like_active");
        });

        const deleteButton = this._element.querySelector(".card__btn-delete");
        deleteButton.addEventListener("click", () => {
            this._element.remove();
        });
    }

    _handleOpenPopup() {
        popupCardImage.src = this._link;
        popupCardImage.alt = this._title;
        popupCardTitle.textContent = this._title;
        openPopup(cardPopup);
    }
}

export {initialCards, Card};