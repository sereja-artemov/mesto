let editBtn = document.querySelector('.profile__edit-btn');
let popupEdit = document.querySelector('#popup-edit');
let popup = document.querySelector('.popup');
let popups = document.querySelectorAll('.popup');
let closeBtn = document.querySelectorAll('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let fieldName = document.querySelector('.form__item[id="name"]');
let fieldAbout = document.querySelector('.form__item[id="about"]');
let profileForm = document.querySelector('.form');
let popupPlace = document.querySelector('#popup-place');
let addBtn = document.querySelector('.profile__add-btn');
let placeName = document.querySelector('#place-name');
let placeAbout = document.querySelector('#place-about');
let placeForm = document.querySelector('#form_type_place');
let cardsWrapper = document.querySelector('.cards__wrapper');


function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// закрываем любое окно по клику на крестик
closeBtn.forEach(element => {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    closePopup(event);
  });
});

popups.forEach(element => {
  // закрываем окно по клику на escape
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (element.classList.contains('popup_opened')) {
      element.classList.remove('popup_opened');
    };
  };
});
});


// открываем окно по клику на кнопку редактирования
editBtn.addEventListener('click', function (event) {
  event.preventDefault();
  openPopup(popupEdit);
  // заполняем поля формы данными из профиля
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});
// открываем окно по клику на кнопку добавления
addBtn.addEventListener('click', function (event) {
  event.preventDefault();
  openPopup(popupPlace);
});

// закрываем окно после отправки формы
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  popup.classList.remove('popup_opened');
});



// Карточки
const initialCards = [{
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

// Добавляем html
function createCard(imgLink, titleText) {
  const cardTemplate = document.querySelector('#cards__item').content;
  let cardItem = cardTemplate.querySelector('.cards__item').cloneNode(true);

  let cardImage = cardItem.querySelector('.cards__image');
  cardImage.setAttribute('src', imgLink);
  let cardTitle = cardItem.querySelector('.cards__title');
  cardTitle.innerText = titleText;

  return cardItem;
}

//Обход массива и создание карточек
for (let i = 0; i < initialCards.length; i++) {
  let card = createCard(initialCards[i].link, initialCards[i].name);
  cardsWrapper.append(card);
};

// Добавление новой карточки в начало
function addCard(event) {
  event.preventDefault();
  let card = createCard(placeAbout.value, placeName.value);
  cardsWrapper.prepend(card);
  // Лайк новой карточки
  let likeItem = document.querySelector('.cards__like');
  likeItem.addEventListener('click', function (event) {
    event.preventDefault();
    likeItem.classList.toggle('cards__like_active');
  });
  // Удаление карточки
  delCard();
  popupPlace.classList.remove('popup_opened');
  placeForm.reset();
};

placeForm.addEventListener('submit', addCard);


// Лайк карточки
let likeItem = document.querySelectorAll('.cards__like');
likeItem.forEach(element => {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    element.classList.toggle('cards__like_active');
  });
});


// Удаление карточки
function delCard() {
  let delBtn = document.querySelectorAll('.cards__trash-btn');

  delBtn.forEach(element => {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      const card = event.target.closest('.cards__item');
      card.parentNode.removeChild(card);
    });

  });
}
delCard();

// Попап картинки
let popupCard = document.querySelector('.popup-card');
let popupCardImage = document.querySelectorAll('.cards__image');
let popupCardImageItem = document.querySelector('.popup-card__img');
let popupCardCloseBtn = document.querySelector('.popup-card__close-btn');
let popupCardName = document.querySelector('.popup-card__place-name');
let CardsItem = document.querySelector('.cards__item');

popupCardImage.forEach(element => {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    let cardTitle = element.nextElementSibling.querySelector('.cards__title');
    popupCardName.textContent = cardTitle.textContent;
    let imgSrc = element.getAttribute('src');
    popupCardImageItem.setAttribute('src', imgSrc);
    popupCard.classList.add('popup_opened');
  });

});
