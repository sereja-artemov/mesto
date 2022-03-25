const editBtn = document.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('#popup-edit');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const closeBtn = document.querySelectorAll('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const fieldName = document.querySelector('.form__item[id="name"]');
const fieldAbout = document.querySelector('.form__item[id="about"]');
const profileForm = document.querySelector('.form');
const popupPlace = document.querySelector('#popup-place');
const addBtn = document.querySelector('.profile__add-btn');
const placeName = document.querySelector('#place-name');
const placeAbout = document.querySelector('#place-about');
const placeForm = document.querySelector('#form_type_place');
const cardsWrapper = document.querySelector('.cards__wrapper');

// Попап картинки
const popupCard = document.querySelector('.popup-card');
const popupCardImageItem = document.querySelector('.popup-card__img');
const popupCardCloseBtn = document.querySelector('.popup-card__close-btn');
const popupCardName = document.querySelector('.popup-card__place-name');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// закрываем любое окно по клику на крестик
closeBtn.forEach(element => {
  element.addEventListener('click', function (event) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

function openProfileEditPopup() {
  openPopup(popupEdit);
  // заполняем поля формы данными из профиля
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
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

const cardTemplate = document.querySelector('#cards__item').content;
// Добавляем html
function createCard(imgLink, titleText) {
  const cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.cards__image');
  cardImage.setAttribute('src', imgLink);
  cardImage.setAttribute('alt', titleText);
  const cardTitle = cardItem.querySelector('.cards__title');
  cardTitle.textContent = titleText;

  //лайк карточки
  const likeItem = cardItem.querySelector('.cards__like');
  likeItem.addEventListener('click', likeCard);

  //открытие окна с картинкой
  cardImage.addEventListener('click', openPopupCard);
  //удаление карточки
  const delBtn = cardItem.querySelector('.cards__trash-btn');
  delBtn.addEventListener('click', () => {
    cardItem.remove();
  });

  return cardItem;
}

//Обход массива и создание карточек
for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i].link, initialCards[i].name);
  cardsWrapper.append(card);
};

// Добавление новой карточки в начало
function addCard(event) {
  event.preventDefault();
  const card = createCard(placeAbout.value, placeName.value);
  cardsWrapper.prepend(card);
  closePopup(popupPlace);
  placeForm.reset();
};

// Лайк карточки
function likeCard(event) {
  event.target.classList.toggle('cards__like_active');
}

//открытие окна с картинкой
function openPopupCard(event) {
  const cardItem = event.target.closest('.cards__item');
  const cardTitle = cardItem.querySelector('.cards__title');
  popupCardName.textContent = cardTitle.textContent;
  const imgSrc = event.target.closest('.cards__image').src;
  popupCardImageItem.setAttribute('src', imgSrc);
  popupCardImageItem.setAttribute('alt', cardTitle.textContent);
  openPopup(popupCard);
}

// открываем окно по клику на кнопку редактирования
editBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
addBtn.addEventListener('click', openPlacePopup);
// закрываем окно после отправки формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', addCard);
