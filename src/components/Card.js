import api from "../components/Api.js"

export default class Card {
    constructor(data, cardSelector, handleCardClick, currentUserId, deleteSubmitHandler) {
        this._title = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._userId = data.userId;
        this._ownerId = data.owner._id;
        this._data = data;
        this._currentUserId = currentUserId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deleteSubmitHandler = deleteSubmitHandler;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        this._deleteButton = cardElement.querySelector(".card__btn-delete");
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;
        if (this._ownerId !== this._currentUserId) {
            this._deleteButton.classList.add("card__btn-delete_hidden");
        }
        const isLiked = this._data.likes.some((like) => {
            if (like._id === this._currentUserId) {
                return true;
            }
        })
        isLiked ? this._element.querySelector(".card__btn-like").classList.add("card__btn-like_active") : this._element.querySelector(".card__btn-like").classList.remove("card__btn-like_active");
        this._element.querySelector(".card__like-counter").textContent = this._data.likes.length;
        this._setEventListeners();
        return this._element;
    }

    _deleteButtonHandler() {
        this._deleteSubmitHandler(this._cardId, this._element)
    }
    _setEventListeners() {
        this._cardImage.addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this._handleCardClick(this._link, this._title);
        });

        this._element.querySelector(".card__btn-like").addEventListener("click", () => this._handleCardLike());

        this._element.querySelector(".card__btn-delete").addEventListener("click", (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this._deleteButtonHandler();
        });
    }

    _addLike() {
        api.addLike(this._cardId)
            .then((res) => {
                this._element.querySelector(".card__btn-like").classList.add("card__btn-like_active");
                this._element.querySelector(".card__like-counter").textContent = res.likes.length;
                this._data = res;
            })
    }

    _removeLike() {
        api.removeLike(this._cardId)
            .then((res) => {
                this._element.querySelector(".card__btn-like").classList.remove("card__btn-like_active");
                this._element.querySelector(".card__like-counter").textContent = res.likes.length;
                this._data = res;
            })
    }

    _handleCardLike() {
        const isLiked = this._data.likes.some((like) => {
            if (like._id === this._currentUserId) {
                return true;
            }
        })
        isLiked ? this._removeLike() : this._addLike();
    }
}