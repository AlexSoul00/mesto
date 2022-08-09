import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor (popupSelector){
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._popupImg = this._popupElement .querySelector('.popup__big-image')
    this._popupText = this._popupElement .querySelector('.popup__image-text')
  }

  setEventListeners(){
    super.setEventListeners();
  }

  open(name, link){
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupText.textContent = name;
    super.open();
  }

  close(){
    super.close();
  }
}

export {PopupWithImage}