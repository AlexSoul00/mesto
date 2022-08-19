import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor (popupSelector){
    super(popupSelector);
    this._popupImg = this._popupElement.querySelector('.popup__big-image')
    this._popupText = this._popupElement.querySelector('.popup__image-text')
  }

  open(data){
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupText.textContent = data.name;
    super.open();
  }

  close(){
    super.close();
  }
}

export {PopupWithImage}