export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.title;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._link, this._title);
        });
        this._element.querySelector(".card__btn-like").addEventListener("click", () => this._handleCardLike());
        
        this._element.querySelector(".card__btn-delete").addEventListener("click", () => this._handleCardDelete());
    }

    _handleCardLike() {
        this._element.querySelector(".card__btn-like").classList.toggle("card__btn-like_active");
    }

    _handleCardDelete() {
        this._element.remove();
    }
}