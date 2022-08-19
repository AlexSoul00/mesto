import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._inputlist = this._popupElement.querySelectorAll('.popup__input');
    this._initialValueSubmitButton = this._submitButton.textContent;
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
    })
  }

  loadingAnimation (loading) {
    if (loading) {
      const submitMassage = 'Cохранение...';
      this._submitButton.textContent = submitMassage;
    } else {
      this._submitButton.textContent = this._initialValueSubmitButton;
    }
  }
}

export {PopupWithForm}
