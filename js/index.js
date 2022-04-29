import { initialCards } from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import { openPopupCard } from './utils.js';

const penBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('#popup-edit');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const fieldName = document.querySelector('.form__item[id="name"]');
const fieldAbout = document.querySelector('.form__item[id="about"]');
const profileForm = document.querySelector('.form');
const popupPlace = document.querySelector('#popup-place');
const btnAdd = document.querySelector('.profile__add-btn');
const placeName = document.querySelector('#place-name');
const placeAbout = document.querySelector('#place-about');
const placeForm = document.querySelector('#form_type_place');
const cardsWrapper = document.querySelector('.cards__wrapper');


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_status_disabled',
  inputErrorClass: 'form__item_status_error',
  errorClass: 'form__error-msg_active',
}



function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

// закрываем любое окно
popups.forEach(element => {
  element.addEventListener('click', (event) => {

    function selector(element) {
      return event.target.classList.contains(element);
    }

    if (selector('popup') || selector('popup__close-btn')) {
       closePopup(element);
    }
  });
});

// закрываем окно по клику на escape
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
// // очистка полей с ошибкой
function clearInputError(popup) {
  const itemWrapperList = popup.querySelectorAll('.form__item-wrapper');

  itemWrapperList.forEach(element => {
    const input = element.querySelector('.form__item');
    const error = element.querySelector('.form__error-msg');

    input.classList.remove('form__item_status_error');
    error.classList.remove('form__error-msg_active');
  });

}
function openProfileEditPopup() {
  // заполняем поля формы данными из профиля
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;

  clearInputError(popupEdit);
  openPopup(popupEdit);
}

function openPlacePopup() {
  openPopup(popupPlace);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  closePopup(popupEdit);
}

const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector).generateCard();
  return card;
};

// создание карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = createCard(item, '#cards__item');

  // Добавляем в DOM
  cardsWrapper.append(card);
});

//Добавление новой карточки в начало
const addCard = () => {
  const newCard = createCard({name: placeName.value, link: placeAbout.value}, '#cards__item');
  cardsWrapper.prepend(newCard);
  closePopup(popupPlace);
  placeForm.reset();
  const btn = placeForm.querySelector('.form__btn');
  this._disableFormButton(btn, 'form__btn_status_disabled');
};

  new FormValidator(validationConfig, placeForm).enableValidation();
  new FormValidator(validationConfig, profileForm).enableValidation();

// открываем окно по клику на кнопку редактирования
penBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
btnAdd.addEventListener('click', openPlacePopup);
// закрываем окно после отправки формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', addCard);

