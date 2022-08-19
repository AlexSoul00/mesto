import {Popup} from "./Popup";

class PopupConfirm extends Popup {
constructor(popupSelector, {handleSubmit}) {
  super(popupSelector);
  this._handleSubmit = handleSubmit;
  this._setEvent = this._setEvent.bind(this);
}

handleSubmitConfirm(submitConfirm) {
  this._handleSubmit = submitConfirm;
}

_setEvent(evt) {
  evt.preventDefault();
  this._handleSubmit();
}

open() {
  this._popupElement.addEventListener('submit', this._setEvent);
  super.open();
}

close() {
  this._popupElement.removeEventListener('submit', this._setEvent);
  super.close();
}

}

export {PopupConfirm}