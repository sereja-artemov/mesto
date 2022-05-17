import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = popupSelector.querySelector('form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._formSubmit = formSubmit;
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
  close() {
    super.close();
    this._form.reset();
  }
  setEventListeners() {
    super.setEventListeners();

    document.addEventListener('keydown', this._handleEscClose);
    this._form.addEventListener('submit', this._formSubmit);
  }
}
