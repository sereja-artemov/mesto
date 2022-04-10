const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  disabledBtnSelector: 'form__btn_status_disabled',
  formBtnSelector: '.form__btn',
}
const {disabledBtnSelector, formBtnSelector} = validationConfig;

const validateInput = (input) => {
  const errorElement = input.parentNode.querySelector(`.${input.id}-error`);
  errorElement.textContent = input.validationMessage;
}

const setButtonState = (button, isValid) => {
  if (!isValid) {
    button.disabled = true;
    button.classList.add(disabledBtnSelector);
  } else {
    button.disabled = false;
    button.classList.remove(disabledBtnSelector);
  }
}

const handleInput = (event) => {
  const currentForm = event.currentTarget;
  const input = event.target;
  const submitButton = currentForm.querySelector(formBtnSelector);

  validateInput(input);
  setButtonState(submitButton, currentForm.checkValidity(input));
}

const handleSubmit = (event) => {
  event.preventDefault();
  const currentForm = event.target;

  if (currentForm.checkValidity()) {
    currentForm.reset();
  }
};

const enableValidation = ({formSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', handleSubmit);
    formElement.addEventListener('input', handleInput);

  });
}

enableValidation(validationConfig);
