import { initialCards, cardsContainerSelector } from '../js/utils/constants.js';
import {Card} from '../js/components/Card.js';
import {FormValidator} from '../js/FormValidator.js';
// import { openPopupCard } from '../js/utils/utils.js';
import { Section } from '../js/components/Section.js';
import { Popup } from '../js/components/Popup.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { UserInfo } from '../js/components/UserInfo.js';

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

// закрываем любое окно
// popups.forEach(element => {
//   element.addEventListener('click', (event) => {

//     function selector(element) {
//       return event.target.classList.contains(element);
//     }

//     if (selector('popup') || selector('popup__close-btn')) {
//        closePopup(element);
//     }
//   });
// });


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
  const popup = new PopupWithForm(popupEdit);
  const userInfo = new UserInfo(profileName, profileAbout);
  const userInfoValues = userInfo.getUserInfo();

  // заполняем поля формы данными из профиля
  fieldName.value = userInfoValues.name;
  fieldAbout.value = userInfoValues.about;

  clearInputError(popupEdit);
  popup.open();
  popup.setEventListeners();
}

function openPlacePopup() {
  const popup = new Popup(popupPlace);
  popup.open();
  popup.setEventListeners();
}
//попап картинки
const popupCard = document.querySelector('.popup-card');
function openPopupWidthImage() {
  const popup = new PopupWithImage(popupCard);
  popup.open();
  popup.setEventListeners();
}




const createCard = (data, cardSelector, handleCardClick) => {
  const card = new Card(data, cardSelector, handleCardClick).generateCard();
  return card;
};

//создаем класс section и добавляем карточки
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = createCard(element, '#cards__item', openPopupWidthImage);
      cardsList.addItem(card);
    }
  },
  cardsContainerSelector
);

cardsList.renderItems();


// // создание карточек
// initialCards.forEach((item) => {
//   // Создадим экземпляр карточки
//   const card = createCard(item, '#cards__item');

//   // Добавляем в DOM
//   cardsWrapper.append(card);
// });

//Добавление новой карточки в начало
const addCard = () => {
  const newCard = createCard({name: placeName.value, link: placeAbout.value}, '#cards__item', openPopupWidthImage);
  cardsWrapper.prepend(newCard);
  popupPlaceForm.close();
  placeForm.reset();

  formCardValidator.disableFormButton();
};

const formCardValidator = new FormValidator(validationConfig, placeForm);
const formProfileValidator = new FormValidator(validationConfig, profileForm);

formProfileValidator.enableValidation();
formCardValidator.enableValidation();


// открываем окно по клику на кнопку редактирования
penBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
btnAdd.addEventListener('click', openPlacePopup);
// закрываем окно после отправки формы
// profileForm.addEventListener('submit', handleProfileFormSubmit);
// placeForm.addEventListener('submit', addCard);



const popupPlaceForm = new PopupWithForm(popupPlace, addCard);
popupPlaceForm.setEventListeners();

const editProfileForm = new PopupWithForm(popupEdit, handleProfileFormSubmit);
editProfileForm.setEventListeners();

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const data = editProfileForm._getInputValues();
  const userInfo = new UserInfo(profileName, profileAbout);
  userInfo.setUserInfo(data);
  editProfileForm.close();
}
