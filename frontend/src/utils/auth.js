class Auth {
  constructor({baseURL, headers}) {
    this._headers = headers;
    this._baseURL = baseURL;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка')
  }

  checkToken = (token) => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res));
  }

  register(data) {
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Accept': 'application/json'
      },
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
      headers: {
        ...this._headers
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._checkResponse(res));
  };
}

export const
  auth = new Auth({
    baseURL: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });


