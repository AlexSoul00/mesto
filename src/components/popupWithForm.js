import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}){
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputlist = this._popupElement.querySelectorAll('.popup__input');
  }
  _getInputValues(){
    const data = {};
    this._inputlist.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  open(){
    super.open()
  }

  close(){
    super.close();
    this._form.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}

export {PopupWithForm}