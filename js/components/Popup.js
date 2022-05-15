export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(event) {
    const popupOpened = this.querySelector('.popup_opened');
    if (event.key === 'Escape' && popupOpened) {
      popupOpened.classList.remove('popup_opened');
    }
  }
  setEventListeners() {
      this._popupSelector.addEventListener('click', (event) => {

      function selector(element) {
        return event.target.classList.contains(element);
      }

      if (selector('popup') || selector('popup__close-btn')) {
         this.close();
      }

    });
    document.addEventListener('keydown', this._handleEscClose);
  }
}
