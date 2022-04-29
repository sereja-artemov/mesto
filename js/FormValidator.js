export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    // const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._inputList, this._submitButton);
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(this._formElement, inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._disableFormButton(buttonElement, this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  };

  // Функция принимает массив полей
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  };

  // Функция, которая проверяет валидность поля
  _isValid(formElement, inputElement, rest) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      // Если проходит, скроем
      this._hideInputError(formElement, inputElement, rest);
    }
  };

    // Функция, которая добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.classList.add(this._errorClass);
    formError.textContent = errorMessage;
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement) {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  };

  _disableFormButton(buttonElement, selector) {
    buttonElement.classList.add(selector);
    buttonElement.setAttribute('disabled', 'disabled');
  };

}

