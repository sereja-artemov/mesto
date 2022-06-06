import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
      //находим картинку и название в попапе, которые нужно заполнить
      this._popupCardName = popupElement.querySelector('.popup-card__place-name');
      this._popupCardImageItem = popupElement.querySelector('.popup-card__img');
  }
  open(name, link) {
    this._popupCardName.textContent = name;
    this._popupCardImageItem.setAttribute('src', link);
    this._popupCardImageItem.setAttribute('alt', name);

    super.open();
  }
}
