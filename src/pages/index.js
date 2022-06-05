import './index.css';
import { cardsContainerSelector } from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Popup from '../js/components/Popup.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import {
  penBtn,
  popupEdit,
  profileName,
  profileAbout,
  fieldName,
  fieldAbout,
  profileForm,
  popupPlace,
  btnAdd,
  placeForm,
  popupCard,
  validationConfig,
  popupAvatar,
  avatarLink,
  avatarBtn,
  avatarForm,
  popupConfirm
} from '../js/utils/constants.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '421e1d14-42de-4757-b693-b79ba1c9d363',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage(popupCard, openProfileEditPopup);
popupWithImage.setEventListeners();

const editProfileForm = new PopupWithForm(popupEdit, handleProfileFormSubmit);
editProfileForm.setEventListeners();

const popupPlaceForm = new PopupWithForm(popupPlace, addCard);
popupPlaceForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
popupAvatarForm.setEventListeners();

const popupConfirmForm = new PopupWithForm(popupConfirm, handleConfirmFormSubmit);
popupConfirmForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout);


function openProfileEditPopup() {
  const userInfoValues = userInfo.getUserInfo();

  // заполняем поля формы данными из профиля
  fieldName.value = userInfoValues.name;
  fieldAbout.value = userInfoValues.about;

  formProfileValidator.resetValidation();

  editProfileForm.open();
}

function openPlacePopup() {
  formCardValidator.resetValidation();
  popupPlaceForm.open();
}
//попап картинки
function openPopupWidthImage() {
  popupWithImage.open(event.target.alt, event.target.src);
}

function openAvatarPopup() {
  avatarForm.resetValidation();
  popupAvatar.open();
}

function openPopupConfirm() {
  popupConfirm.open();
}

const createCard = (data, cardSelector, userId, handleCardClick, delCard, setLike, removeLike) => {
  const card = new Card(data, cardSelector, userId, handleCardClick, delCard, setLike, removeLike).generateCard();
  return card;
};

const initialCards = [];
let userId = '';

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then((data) => {
  const [initialCards, userData] = data;
  cardsList.renderItems(initialCards);
  userId = userData.id;
})
.catch((err) => {
  console.log(err);
})

//создаем класс section и добавляем карточки
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = createCard(element, '#cards__item', userId, openPopupWidthImage, setLike, removeLike);
      cardsList.addItemToEnd(card);
    }
  },
  cardsContainerSelector
);

// cardsList.renderItems();

const formCardValidator = new FormValidator(validationConfig, placeForm);
const formProfileValidator = new FormValidator(validationConfig, profileForm);
const formAvatarValidator = new FormValidator(validationConfig, avatarForm);

formCardValidator.enableValidation();
formProfileValidator.enableValidation();
// avatarForm.enableValidation();


// открываем окно по клику на кнопку редактирования
penBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
btnAdd.addEventListener('click', openPlacePopup);
// avatarBtn.addEventListener('click', openAvatarPopup);

//Добавление новой карточки в начало
function addCard(formData) {
  const newCard = createCard(formData, '#cards__item', openPopupWidthImage, delCard);
  api.sendNewCard(formData.name ,formData.link)
  cardsList.addItemToStart(newCard);
  popupPlaceForm.close();
  placeForm.reset();

  formCardValidator.disableFormButton();
};
// получаем данные пользователя с сервера в виде объекта
// const userData = api.getUserInfo();

//function handleProfileFormSubmit(formData) {
//  userInfo.setUserInfo(formData);
//  editProfileForm.close();
//}

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo(formData);
  api.sendUserInfo(formData);
  editProfileForm.close();
}

function handleAvatarFormSubmit() {
  api.setUserAvatar(avatarLink);
}

function handleConfirmFormSubmit(data) {
  api.delCard(data);
}

function setLike(data) {
  api.setLike(data);
}

function removeLike(data) {
  api.removeLike(data);
}
