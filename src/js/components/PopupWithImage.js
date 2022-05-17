import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
      //находим картинку и название в попапе, которые нужно заполнить
      this._popupCardName = popupSelector.querySelector('.popup-card__place-name');
      this._popupCardImageItem = popupSelector.querySelector('.popup-card__img');
  }
  open(name, link) {
    this._popupCardName.textContent = name;
    this._popupCardImageItem.setAttribute('src', link);
    this._popupCardImageItem.setAttribute('alt', name);

    super.open();
  }
}
