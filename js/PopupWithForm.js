class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }
  _getInputValues() {

  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('form').reset();
  }
  setEventListeners() {
    this._formSubmit.addEventListener('submit', );
    this._popupSelector.addEventListener('click', (event) => {

    function selector(element) {
      return event.target.classList.contains(element);
    }

    if (selector('popup') || selector('popup__close-btn')) {
       close();
    }

  });
}
}
