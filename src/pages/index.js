import './index.css';
import { cardsContainerSelector } from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Popup from '../js/components/Popup.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import PopupWithSubmit from '../js/components/PopupWithSubmit.js';
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
  avatarLinkInput,
  avatarOverlay as avatarBtn,
  avatarForm,
  avatarImg,
  popupConfirm,
  cardSelector,
  submitBtnPlace,
  submitBtnAbout,
  submitBtnAvatar,
  submitBtnSubmit
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

const popupWithSubmit = new PopupWithSubmit(popupConfirm);
popupWithSubmit.setEventListeners();



const userInfo = new UserInfo(profileName, profileAbout, avatarImg);


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
  formAvatarValidator.resetValidation();
  popupAvatarForm.open();
}

const initialCards = [];
let userId = '';

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then((data) => {
  const [initialCards, userData] = data;
  userId = userData._id;
  cardsList.renderItems(initialCards.reverse());

  userInfo.setUserInfo(userData);
})
.catch((err) => {
  console.log(err);
})

const renderer = (data) => {
  const card = new Card(
    data,
    cardSelector,
    userId,
    openPopupWidthImage,
    handleDeleteCard,
    setLike,
    removeLike
  );

  const CardElement = card.generateCard();
  cardsList.addItem(CardElement);

  function handleDeleteCard(element) {
    popupWithSubmit.setSubmitHandler(() => {
      loadingDataStatus(true, submitBtnSubmit);
      api.delCard(element)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        card.deleteCard();
        popupWithSubmit.close();
        loadingDataStatus(false, submitBtnSubmit);
      });
    })
    popupWithSubmit.open();
  }
};

//создаем класс section и добавляем карточки
const cardsList = new Section(
  {
    items: initialCards,
    renderer
  },
  cardsContainerSelector
);


const formCardValidator = new FormValidator(validationConfig, placeForm);
const formProfileValidator = new FormValidator(validationConfig, profileForm);
const formAvatarValidator = new FormValidator(validationConfig, avatarForm);

formCardValidator.enableValidation();
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();


// открываем окно по клику на кнопку редактирования
penBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
btnAdd.addEventListener('click', openPlacePopup);
avatarBtn.addEventListener('click', openAvatarPopup);

//Добавление новой карточки в начало
function addCard(formData) {
  loadingDataStatus(true, submitBtnPlace);
  api.sendNewCard(formData)
  .then((data) => {

    renderer(data);
   })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loadingDataStatus(false, submitBtnPlace);
    popupPlaceForm.close();
    placeForm.reset();
  })

  formCardValidator.disableFormButton();
};

//Отправляем форму редактирования пользователя и обновляем данные
function handleProfileFormSubmit(formData) {
  loadingDataStatus(true, submitBtnAbout);
  api.sendUserInfo(formData)
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loadingDataStatus(false, submitBtnAbout);
  });
  editProfileForm.close();
}

function handleAvatarFormSubmit() {
  loadingDataStatus(true, submitBtnAvatar);
  api.setUserAvatar(avatarLinkInput.value)
  .then((newAvatar) => {
    userInfo.setUserInfo(newAvatar);
    popupAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loadingDataStatus(false, submitBtnAvatar);
  });
}

function setLike(data) {
  api.setLike(data)
  .catch((err) => {
    console.log(err);
  });
}

function removeLike(data) {
  api.removeLike(data)
  .catch((err) => {
    console.log(err);
  });
}

function loadingDataStatus(isLoading, btn) {
  if (isLoading) {
    btn.value = "Происходит магия...";
    btn.classList.add('form__btn_status_disabled');
  } else {
    btn.value = "Сохранить";
    btn.classList.remove('form__btn_status_disabled');
  }
}
