class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  setEventListeners(){
    this._popupElement.addEventListener('mousedown', (e) => {
      this._handleOverlay(e)})
      this._popupCloseButton.addEventListener ('click', () => {
      this.close()})
    } 

  open(){
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlay(e) {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export {Popup}