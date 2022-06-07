import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._popupElement = document.querySelector(this.popupSelector);
    this._form = this._popupElement.querySelector('form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._submitHandler = submitHandler;
    this._submitBtn = this._popupElement.querySelector('.form__btn');
    this._submitBtnValue = this._submitBtn.value;
  }
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
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

  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }
}
