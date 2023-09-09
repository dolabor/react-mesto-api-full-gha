class Auth {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка')
  }

  checkToken = () => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  register(data) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._checkResponse(res))
  };

  login(data) {
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._checkResponse(res));
  };

  logout = () => {
    return fetch(`${this._baseURL}/signout`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }
}

export const
  auth = new Auth({
    baseURL: 'https://api.mesto-ec.students.nomoredomainsicu.ru',
    headers: {
      'Content-Type': 'application/json'
    }
  });


