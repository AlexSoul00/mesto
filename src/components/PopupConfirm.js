import {Popup} from "./Popup";

class PopupConfirm extends Popup {
  constructor (popupSelector, { submit }){
    super(popupSelector);
    this._submit = submit;
    this._popupElement = document.querySelector(this._popupSelector);
    this._form= this._popupElement.querySelector('.form');
    this._submitHandler = this._submitHandler.bind(this);
  }

  open(){
    super.open;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submit(this._data);
    this._form.removeEventListener('submit', this._submitHandler);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }
}

export {PopupConfirm}