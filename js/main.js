let editBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let fieldName = document.querySelector('.form__item[id="name"]');
let fieldAbout = document.querySelector('.form__item[id="about"]');
let profileForm = document.querySelector('.form');

function closePopup() {
  popup.classList.remove('popup_opened');
};

function openPopup() {
  popup.classList.add('popup_opened');
};

// открываем окно по клику на кнопку редактирования
editBtn.addEventListener('click', function(event) {
  event.preventDefault();
  openPopup();
  // заполняем поля формы данными из профиля
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});
// закрываем окно по клику на крестик
closeBtn.addEventListener('click', function(event) {
  event.preventDefault();
  closePopup();
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  closePopup();
});
