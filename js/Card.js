import {initialCards} from './cards.js';
export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
  
    // Добавим данные
    const cardImage = this._element.querySelector('.cards__image');
    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt', this._name); 
    const cardTitle = this._element.querySelector('.cards__title');
    cardTitle.textContent = this._name;
  
    // Вернём элемент наружу
    return this._element;
  }
  
  _setEventListeners() {
    //лайк карточки
    const likeItem = this._element.querySelector('.cards__like');
    likeItem.addEventListener('click', _likeCard);
    //открытие окна с картинкой
    cardImage.addEventListener('click', openPopupCard);
    //удаление карточки
    const trashBtn = this._element.querySelector('.cards__trash-btn');
    trashBtn.addEventListener('click', () => this._element.remove());

  }

}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#cards__item');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  const cardsWrapper = document.querySelector('.cards__wrapper');
  cardsWrapper.append(cardElement);
}); 
