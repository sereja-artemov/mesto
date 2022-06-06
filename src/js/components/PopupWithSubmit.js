import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = popupSelector.querySelector('form');
    // this._inputList = this._form.querySelectorAll('.form__item');
  }

  close() {
    super.close();
    this._form.reset();
  }

  setSubmitHandler(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
