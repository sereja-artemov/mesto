export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then(this._getData);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    }).then(this._getData);
  }

  sendUserInfo(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._getData);
  }

  sendNewCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then(this._getData);

  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    }).then(this._getData);
  }

  delCard(data) {
    return fetch(this._baseUrl + '/cards/' + `${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._getData);
  }

  setLike(data) {
    return fetch(this._baseUrl + '/cards/' + `${data._id}` + '/likes', {
      method: 'PUT',
      headers: this._headers
    }).then(this._getData);
  }

  removeLike(data) {
    return fetch(this._baseUrl + '/cards/' + `${data._id}` + '/likes', {
      method: 'DELETE',
      headers: this._headers
    }).then(this._getData);
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}
