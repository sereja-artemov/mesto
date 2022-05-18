import './index.css';
import { initialCards, cardsContainerSelector } from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Popup from '../js/components/Popup.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';

const penBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('#popup-edit');
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
const popupCard = document.querySelector('.popup-card');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_status_disabled',
  inputErrorClass: 'form__item_status_error',
  errorClass: 'form__error-msg_active',
}

const popup = new Popup(popupPlace);
popup.setEventListeners();

const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm(popupEdit);
popupWithImage.setEventListeners();

function openProfileEditPopup() {
  const userInfo = new UserInfo(profileName, profileAbout);
  const userInfoValues = userInfo.getUserInfo();

  // заполняем поля формы данными из профиля
  fieldName.value = userInfoValues.name;
  fieldAbout.value = userInfoValues.about;

  formProfileValidator.resetValidation();

  popupWithForm.open();
}

function openPlacePopup() {
  formCardValidator.resetValidation();
  popup.open();
}
//попап картинки
function openPopupWidthImage() {
  popupWithImage.open(event.target.alt, event.target.src);
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
      cardsList.addItemToEnd(card);
    }
  },
  cardsContainerSelector
);

cardsList.renderItems();

const formCardValidator = new FormValidator(validationConfig, placeForm);
const formProfileValidator = new FormValidator(validationConfig, profileForm);

formCardValidator.enableValidation();
formProfileValidator.enableValidation();


// открываем окно по клику на кнопку редактирования
penBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
btnAdd.addEventListener('click', openPlacePopup);


const popupPlaceForm = new PopupWithForm(popupPlace, addCard);
popupPlaceForm.setEventListeners();

//Добавление новой карточки в начало
function addCard(formData) {
  const newCard = createCard(formData, '#cards__item', openPopupWidthImage);
  cardsList.addItemToStart(newCard);
  popupPlaceForm.close();
  placeForm.reset();

  formCardValidator.disableFormButton();
};


const editProfileForm = new PopupWithForm(popupEdit, handleProfileFormSubmit);
editProfileForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout);

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo(formData);
  editProfileForm.close();
}
