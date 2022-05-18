import './index.css';
import { initialCards, cardsContainerSelector } from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Popup from '../js/components/Popup.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
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
  validationConfig
} from '../js/utils/constants.js';


const popupWithImage = new PopupWithImage(popupCard, openProfileEditPopup);
popupWithImage.setEventListeners();

const editProfileForm = new PopupWithForm(popupEdit, handleProfileFormSubmit);
editProfileForm.setEventListeners();

const popupPlaceForm = new PopupWithForm(popupPlace, addCard);
popupPlaceForm.setEventListeners();

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


//Добавление новой карточки в начало
function addCard(formData) {
  const newCard = createCard(formData, '#cards__item', openPopupWidthImage);
  cardsList.addItemToStart(newCard);
  popupPlaceForm.close();
  placeForm.reset();

  formCardValidator.disableFormButton();
};

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo(formData);
  editProfileForm.close();
}
