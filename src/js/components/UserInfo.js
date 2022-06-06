export default class UserInfo {
  constructor( { userNameSelector, userAboutSelector, userAvatarSelector } ) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;

    this._userNameElement = document.querySelector(this._userNameSelector);
    this._userAboutElement = document.querySelector(this._userAboutSelector);
    this._userAvatarElement = document.querySelector(this._userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
      avatar: this._userAvatarElement.src
    };
  }
  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutElement.textContent = data.about;
    this._userAvatarElement.src = data.avatar;
  }
}
