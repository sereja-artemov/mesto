import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = popupElement.querySelector('form');
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
