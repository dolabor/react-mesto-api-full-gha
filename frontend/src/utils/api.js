class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.title,
        link: data["image-ref"]
      })
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res))
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка')
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto-ec.students.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

