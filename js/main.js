let editBtn = document.querySelector('.edit-btn');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let fieldName = document.querySelector('.form__item[id="name"]');
let fieldAbout = document.querySelector('.form__item[id="about"]');
let profileForm = document.querySelector('.form');

// открываем окно по клику на кнопку редактирования
editBtn.addEventListener('click', function(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  // заполняем поля формы данными из профиля
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});
// закрываем окно по клику на крестик
closeBtn.addEventListener('click', function(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
  profileForm.reset();

});
// закрываем окно по клику на escape
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  }
});

profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  popup.classList.remove('popup_opened');
});
