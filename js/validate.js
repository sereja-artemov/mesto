const addPlaceForm = document.querySelector('#form_type_place');
const editUserForm = document.querySelector('#form_type_user');

const checkInputValidity = (input) => {

  if (!input.validity.valid) {
    return false;
  }
  return input.checkInputValidity();
}

const validateInput = (input) => {
  const errorElement = input.parentNode.querySelector(`.${input.id}-error`);
  errorElement.textContent = input.validationMessage;
}

const setButtonState = (button, isValid) => {
  if (!isValid) {
    button.disabled = true;
    button.classList.add('form__btn_status_disabled');
  } else {
    button.disabled = false;
    button.classList.remove('form__btn_status_disabled');
  }
}

const handleInput = (event) => {
  const currentForm = event.currentTarget;
  const input = event.target;
  const submitButton = currentForm.querySelector('.form__btn');

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

// Отслеживаем отправку форм
addPlaceForm.addEventListener('submit', handleSubmit);
editUserForm.addEventListener('submit', handleSubmit);
// Отслеживаем ввод данных в поля форм
addPlaceForm.addEventListener('input', handleInput);
editUserForm.addEventListener('input', handleInput);
