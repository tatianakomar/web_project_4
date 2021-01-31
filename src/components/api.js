class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getCardList() {
        return fetch(this._baseUrl + "/cards", {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

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

    addCard({ name, link }) {
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

    removeCard(cardID) {
        return fetch(this._baseUrl + `/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

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

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + "/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name: name, about: about })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }

    setUserAvatar({ avatar }) {
        return fetch(this._baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatar })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res, statusText))
            .catch(err => console.log("err", err))
    }
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-8",
    headers: {
        authorization: "31e91006-0f07-44fb-844b-4c49d9b3a932",
        "Content-Type": "application/json"
    }
});

export default api;