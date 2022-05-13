class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose() {
    if (event.key === 'Escape') {
      close();
    }
  }
  setEventListeners() {
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