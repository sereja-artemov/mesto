class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    this.name = name;
    this.link = link;
    super(popupSelector);
  }
  open(name, link) {
    const popupCardName = this._popupSelector.querySelector('.popup-card__place-name');
    const popupCardImageItem = this._popupSelector.querySelector('.popup-card__img');
    popupCardName.textContent = this.name;
    popupCardImageItem.setAttribute('src', this.name);
    popupCardImageItem.setAttribute('alt', this.link);

    this._popupSelector.classList.add('popup_opened');
  }
}