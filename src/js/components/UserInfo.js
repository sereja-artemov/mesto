export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent,
      avatar: this._userAvatarSelector.src
    };
  }
  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userAboutSelector.textContent = data.about;
    this._userAvatarSelector.src = data.avatar;
  }
}
