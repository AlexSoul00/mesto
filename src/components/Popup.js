class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
  }

  setEventListeners(){
    document.addEventListener('mousedown', (e) => {
      this._handleOverlay(e)})
    document.addEventListener('keydown', (e) => {
      this._handlerEscButton(e)})
      this._popupCloseButton.addEventListener ('click', () => {
      this.close()})
    } 

  _removeEventListeners(){
    this._popupElement.removeEventListener('mousedown', (e) => {
      this._handleOverlay(e)})
    document.removeEventListener('keydown', (e) => {
      this._handlerEscButton(e)})
  }

  open(){
    this._popupElement.classList.add('popup_opened')
    this.setEventListeners();
  }

  close(){
    this._popupElement.classList.remove('popup_opened')
    this._removeEventListeners();
  }

  _handleOverlay(e) {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handlerEscButton(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export {Popup}