export default class Popup {
  constructor(popupSelector, _handleEscClose) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
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
