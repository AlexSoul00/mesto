import {Popup} from "./Popup";

class PopupConfirm extends Popup {
constructor(popupSelector, {handleSubmit}) {
  super(popupSelector);
  this._handleSubmit = handleSubmit;
  this._form = this._popupElement.querySelector('.popup__form');
}

handleSubmitConfirm(submitConfirm) {
  this._handleSubmit = submitConfirm;
}

setEventListeners(){
  super.setEventListeners();
  this._form.addEventListener('submit', (e) => {
    e.preventDefault();
    this._handleSubmit();
  })
}

}

export {PopupConfirm}