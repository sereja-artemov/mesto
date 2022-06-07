import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(this.popupSelector);
    this._form = this._popupElement.querySelector('form');
    this._submitBtn = this._popupElement.querySelector('.form__btn');
    this._submitBtnValue = this._submitBtn.value;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setSubmitHandler(action) {
    this._handleSubmit = action;
  }

  loadingDataStatus(isLoading) {
    if (isLoading) {
      this._submitBtn.value = "Происходит магия...";
      this._submitBtn.classList.add('form__btn_status_disabled');
    } else {
      this._submitBtn.value = this._submitBtnValue;
      this._submitBtn.classList.remove('form__btn_status_disabled');
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
