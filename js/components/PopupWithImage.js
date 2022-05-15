import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // this.name = data.name;
    // this.link = data.link;
    super(popupSelector);
  }
  open() {
    const popupCardName = this._popupSelector.querySelector('.popup-card__place-name');
    const popupCardImageItem = this._popupSelector.querySelector('.popup-card__img');
    popupCardName.textContent = this.name;
    popupCardImageItem.setAttribute('src', this.name);
    popupCardImageItem.setAttribute('alt', this.link);

    this._popupSelector.classList.add('popup_opened');
  }
}
