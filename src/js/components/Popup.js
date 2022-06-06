export default class Popup {
  constructor(popupElement, _handleEscClose) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
      this._popupElement.addEventListener('mousedown', (event) => {

      function checkTargetSelector(element) {
        return event.target.classList.contains(element);
      }

      if (checkTargetSelector('popup') || checkTargetSelector('popup__close-btn')) {
         this.close();
      }

    });
  }
}
