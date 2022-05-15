// export {openPopupCard};


// Попап картинки
// const popupCard = document.querySelector('.popup-card');
// const popupCardImageItem = document.querySelector('.popup-card__img');
// //открытие окна с картинкой
// function openPopupCard(name, link) {
//   const popupCardName = document.querySelector('.popup-card__place-name');
//   popupCardName.textContent = name;
//   popupCardImageItem.setAttribute('src', link);
//   popupCardImageItem.setAttribute('alt', name);
//   openPopup(popupCard);
// }
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
// };
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
// };
// // закрываем окно по клику на escape
// function closeByEsc(event) {
//   if (event.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }
