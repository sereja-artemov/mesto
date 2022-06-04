export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then( res => {
      this._getData(res);
    });
  }

  getUserInfo() {
    fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => {
      this._getData(res);
    });
  }
  
  sendUserInfo(data) {
    fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      this._getData(res);
    });
  }

  sendNewCard(name, link) {
    fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link)
    })
    .then(res => {
      this._getData(res);
    });
    
  }
  
  setUserAvatar(avatar) {
    fetch(this._baseUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
    .then(res => {
      this._getData(res);
    });
  }
  
  delCard(data) {
    fetch(this._baseUrl + '/cards/' + `${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      this._getData(res);
    });
  }
  
  setLike(data) {
    fetch(this._baseUrl + '/cards/' + `${data._id}` + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      this._getData(res);
    });
  }
  
  removeLike(data) {
    fetch(this._baseUrl + '/cards/' + `${data._id}` + '/likes', {
      method: 'DELETE',
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

}
