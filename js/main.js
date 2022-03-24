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
const delBtn = document.querySelector('.cards__trash-btn');


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

function closeProfileEditPopup(event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  closePopup(event);
}
// открываем окно по клику на кнопку редактирования
editBtn.addEventListener('click', openProfileEditPopup);
// открываем окно по клику на кнопку добавления
addBtn.addEventListener('click', openPlacePopup);
// закрываем окно после отправки формы
profileForm.addEventListener('submit', closeProfileEditPopup);



// Добавляем html
function createCard(imgLink, titleText) {
  const cardTemplate = document.querySelector('#cards__item').content;
  const cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = cardItem.querySelector('.cards__image');
  cardImage.setAttribute('src', imgLink);
  const cardTitle = cardItem.querySelector('.cards__title');
  cardTitle.innerText = titleText;

  const likeItem = cardItem.querySelector('.cards__like');

  likeItem.addEventListener('click', likeCard);

  // delCard();

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
  // Лайк новой карточки
  // const likeItem = document.querySelector('.cards__like');
  // likeItem.addEventListener('click', function (event) {
  //   event.preventDefault();
  //   likeItem.classList.toggle('cards__like_active');
  // });


  // Удаление карточки

//   closePopup(popupPlace);
//   placeForm.reset();
};




// Лайк карточки
function likeCard() {
  event.target.classList.toggle('cards__like_active');
}




// Удаление карточки
// function delCard(event) {
//  event.target.closest('.cards__item');
  
// }


  // Попап картинки
  const popupCard = document.querySelector('.popup-card');
  const popupCardImage = document.querySelector('.cards__image');
  const popupCardImageItem = document.querySelector('.popup-card__img');
  const popupCardCloseBtn = document.querySelector('.popup-card__close-btn');
  const popupCardName = document.querySelector('.popup-card__place-name');
  const CardsItem = document.querySelector('.cards__item');
  
  placeForm.addEventListener('submit', addCard);
  function openPopupCard(event) {
    const cardItem = event.target.closest('.cards__item');
    const cardTitle = cardItem.querySelector('.cards__title');
    popupCardName.textContent = cardTitle.textContent;
    const imgSrc = event.target.closest('.cards__image').src;
    popupCardImageItem.setAttribute('src', imgSrc);
    openPopup(popupCard);
  }
  popupCardImage.addEventListener('click', openPopupCard);