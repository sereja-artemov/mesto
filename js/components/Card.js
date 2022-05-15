import { initialCards, cardsContainerSelector } from '../utils/constants.js';
// import { openPopupCard } from '../utils/utils.js';


export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    const cardImage = this._element.querySelector('.cards__image');
    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt', this._name);
    const cardTitle = this._element.querySelector('.cards__title');
    cardTitle.textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  likeCard() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  }

  delCard() {
    this._element.remove();
  }

  _setEventListeners() {

    //лайк карточки
    const likeItem = this._element.querySelector('.cards__like');
    likeItem.addEventListener('click', () => {
      this.likeCard();
    });

    //удаление карточки
    const trashBtn = this._element.querySelector('.cards__trash-btn');
    trashBtn.addEventListener('click', () => {
      this.delCard();
    });

    //открытие окна с картинкой
    const cardImage = this._element.querySelector('.cards__image');
    cardImage.addEventListener('click', this._handleCardClick);
  }

}


