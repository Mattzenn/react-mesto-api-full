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
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    getApiUserInfo() {
        return fetch(this._url + '/users/me', {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setApiUserInfo(newdata) {
        return fetch(this._url + '/users/me', {
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(this._url + '/users/me/avatar', {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/${id}/likes`, {
            credentials: 'include',
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(data) {
        return fetch(this._url + `/cards/likes/${data}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    url: 'http://localhost:3001',
    credentials: 'include',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
})

export default api