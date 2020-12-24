import { openPopup } from "./utils.js";
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
const handleOpenPopup = (link, title) => {
    popupCardImage.src = link;
    popupCardImage.alt = title;
    popupCardTitle.textContent = title;
    openPopup(cardPopup);
}
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
        this._cardImage = this._element.querySelector(".card__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._cardImage.addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            handleOpenPopup(this._link, this._title);
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
}
export { initialCards, Card };