class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // GET https://around.nomoreparties.co/v1/group-08/cards
    getCardList() {
        return fetch(this._baseUrl + "/cards", {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

    // GET https://around.nomoreparties.co/v1/group-08/users/me
    getUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

    getInitialData() {
        return Promise.all([this.getCardList(), this.getUserInfo()])
    }

    getAppInfo() { }

    // POST https://around.nomoreparties.co/v1/group-08/cards
    addCard({ name, link }) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }


    //DELETE https://around.nomoreparties.co/v1/group-08/cards/cardId
    removeCard(cardID) {
        return fetch(this._baseUrl + `/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

    //PUT https://around.nomoreparties.co/v1/group-08/cards/likes/cardId
    //DELETE https://around.nomoreparties.co/v1/group-08/cards/likes/cardId
    addLike(cardID) {
        return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
            method: "PUT",
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))

    }

    removeLike(cardID) {
        return fetch(this._baseUrl + `/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))

    }

    // PATCH https://around.nomoreparties.co/v1/group-08/users/me
    setUserInfo({ name, about }) { }

    // PATCH https://around.nomoreparties.co/v1/group-08/users/me/avatar
    setUserAvatar({ avatar }) { }
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-8",
    headers: {
        authorization: "31e91006-0f07-44fb-844b-4c49d9b3a932",
        "Content-Type": "application/json"
    }
});

export default api;