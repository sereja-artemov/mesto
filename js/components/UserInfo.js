export class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent
    };
  }
  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userAboutSelector.textContent = data.about;
  }
}
