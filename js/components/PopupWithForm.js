import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = popupSelector.querySelector('form');
    this._formSubmit = formSubmit;
  }
  _getInputValues() {

  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._form.reset();
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
    this._form.addEventListener('submit', this._formSubmit);
  }
}
