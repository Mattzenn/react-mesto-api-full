class Api {
    constructor(config) {
        this._url = config.url
        this._headers = config.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getApiUserInfo() {
        return fetch(this._url + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setApiUserInfo(newdata) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newdata.name,
                about: newdata.about
            })
        })
            .then(this._checkResponse);
    }

    postCards(data) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(data) {
        return fetch(this._url + `/cards/${data}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/likes/${id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(data) {
        return fetch(this._url + `/cards/likes/${data}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: '664aaf42-3a4d-4948-aa52-e5498063f0fe',
        'Content-Type': 'application/json'
    }
})

export default api