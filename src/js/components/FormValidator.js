export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector('.form__btn');
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this.disableFormButton();
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  // Функция принимает массив полей
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  }

  // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

    // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.classList.add(this._errorClass);
    formError.textContent = inputElement.validationMessage;
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  disableFormButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

}

