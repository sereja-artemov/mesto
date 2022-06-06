export default class Card {
  constructor(data, cardSelector, userId, handleCardClick, handleDeleteCard, setLike, removeLike) {
    this._data = data;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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

    const trashBtn = this._element.querySelector('.cards__trash-btn');
    if (this._ownerId !== this._userId) {
      trashBtn.remove();
    }
    this.isLiked();
    // Добавим данные
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._name);
    const cardTitle = this._element.querySelector('.cards__title');
    cardTitle.textContent = this._name;
    const likeCounter = this._element.querySelector('.cards__like-counter');
    likeCounter.textContent = this._likes.length;

    // Вернём элемент наружу
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this._element.querySelector('.cards__like').classList.add('cards__like_active');
    }
  }

  _handleLikeBtn() {

    if (this._likeItem.classList.contains('cards__like_active')) {
      // this._likeItem.classList.remove('cards__like_active');
      // this._likeCounter.textContent = this._likes.length -= 1;
      this._removeLike(this._cardId);
    } else {
      // this._likeItem.classList.add('cards__like_active');
      // this._likeCounter.textContent = this._likes.length += 1;
      this._setLike(this._cardId);
    }
  }

  _setEventListeners() {
    this._likeCounter = this._element.querySelector('.cards__like-counter');
    this._likeItem = this._element.querySelector('.cards__like');
    //лайк карточки
    this._likeItem.addEventListener('click', () => {
      this._handleLikeBtn();
    });

    if (this._userId === this._ownerId) {
      //удаление карточки
      const trashBtn = this._element.querySelector('.cards__trash-btn');
      trashBtn.addEventListener('click', () => {
        this._handleDeleteCard(this._data);
      });
    }

    //открытие окна с картинкой
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

}


