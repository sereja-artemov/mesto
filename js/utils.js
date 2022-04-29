import { openPopup } from './index.js';
// Попап картинки
const popupCard = document.querySelector('.popup-card');
const popupCardImageItem = document.querySelector('.popup-card__img');
//открытие окна с картинкой
export function openPopupCard(name, link) {
  const popupCardName = document.querySelector('.popup-card__place-name');
  popupCardName.textContent = name;
  popupCardImageItem.setAttribute('src', link);
  popupCardImageItem.setAttribute('alt', name);
  openPopup(popupCard);
}
