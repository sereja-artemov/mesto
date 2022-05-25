export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    // ...
  }

  getUserInfo() {
    fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => {
      this._getData(res);
    });
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // другие методы работы с API
}
