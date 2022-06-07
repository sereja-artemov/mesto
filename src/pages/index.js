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
  profileNameSelector,
  profileAboutSelector,
  fieldName,
  fieldAbout,
  profileForm,
  popupPlace,
  btnAdd,
  placeForm,
  popupCard,
  validationConfig,
  popupAvatar,
  // avatarLinkInput,
  avatarOverlay as avatarBtn,
  avatarForm,
  avatarImgSelector,
  popupConfirm,
  cardSelector,
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



const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userAboutSelector: profileAboutSelector,
  userAvatarSelector: avatarImgSelector,
});


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
function openPopupWidthImage(data) {
  popupWithImage.open(data.name, data.link);
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

const createCard = (data) => {
    const card = new Card(
    data,
    cardSelector,
    userId,
    openPopupWidthImage,
    handleDeleteCard,
    setLike,
    removeLike
  );

  return card.generateCard(data);

  function handleDeleteCard(element) {
    popupWithSubmit.setSubmitHandler(() => {
      popupWithSubmit.loadingDataStatus(true);
      api.delCard(element)
      .then(() => {
        card.deleteCard();
        popupWithSubmit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithSubmit.loadingDataStatus(false);
      });
    })
    popupWithSubmit.open();
  }
}

const renderer = (data) => {
  const card = createCard(data);
  cardsList.addItem(card);
};
//создаем класс section и добавляем карточки
const cardsList = new Section(
  {
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
  popupPlaceForm.loadingDataStatus(true);
  api.sendNewCard(formData)
  .then((data) => {
    renderer(data);
    popupPlaceForm.close();
   })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupPlaceForm.loadingDataStatus(false);
  })

  formCardValidator.disableFormButton();
};

//Отправляем форму редактирования пользователя и обновляем данные
function handleProfileFormSubmit(formData) {
  editProfileForm.loadingDataStatus(true);
  api.sendUserInfo(formData)
  .then((data) => {
    userInfo.setUserInfo(data);
    editProfileForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfileForm.loadingDataStatus(false);
  });
}

function handleAvatarFormSubmit(InputValues) {
  popupAvatarForm.loadingDataStatus(true);
  api.setUserAvatar(InputValues.avatar)
  .then((newAvatar) => {
    userInfo.setUserInfo(newAvatar);
    popupAvatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatarForm.loadingDataStatus(false);
  });
}

function setLike(data) {
  api.setLike(data)
  .then((newArrLikes) => {
    this.getLikesArr(newArrLikes);
  })
  .catch((err) => {
    console.log(err);
  });
}

function removeLike(data) {
  api.removeLike(data)
  .then((newArrLikes) => {
    this.getLikesArr(newArrLikes);
  })
  .catch((err) => {
    console.log(err);
  });
}
