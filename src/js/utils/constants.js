// Карточки
export const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

export const cardsContainerSelector = '.cards__wrapper';

export const penBtn = document.querySelector('.profile__edit-btn');
export const popupEdit = document.querySelector('#popup-edit');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const fieldName = document.querySelector('.form__item[id="name"]');
export const fieldAbout = document.querySelector('.form__item[id="about"]');
export const profileForm = document.querySelector('.form');
export const popupPlace = document.querySelector('#popup-place');
export const btnAdd = document.querySelector('.profile__add-btn');
export const placeForm = document.querySelector('#form_type_place');
export const popupCard = document.querySelector('.popup-card');
export const popupAvatar = document.querySelector('#popup-avatar');
export const avatarLink = popupAvatar.querySelector('.form__item[id="avatar"]');
export const avatarBtn = document.querySelector('.profile__avatar-btn');
export const avatarForm = document.querySelector('#form_type_avatar');
export const popupConfirm = document.querySelector('#popup-confirm');

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_status_disabled',
  inputErrorClass: 'form__item_status_error',
  errorClass: 'form__error-msg_active',
}
