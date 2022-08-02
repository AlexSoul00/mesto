import {openPopupImage} from './utils.js';

class Card {
  constructor(config, name, link){
    this._config = config;
    this._name = name;
    this._link = link; 
  }

  _getTemplate(){
    return document.querySelector(this._config.cardTemplate)
    .content
    .children[0]
    .cloneNode(true);
  }

  _addEventListeners(){
    this._view.querySelector(this._config.buttonCardDelete)
    .addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })
    this._view.querySelector(this._config.buttonCardLike)
    .addEventListener('click', () => {
      this._likeCard();
    })
    this._view.querySelector(this._config.cardPhoto)
    .addEventListener('click', (evt) => {
      openPopupImage(this._name, this._link)
    })
  }

  _deleteCard(evt){
    evt.preventDefault();
    this._view.remove();
  }

  _likeCard(){
    this._view.querySelector(this._config.buttonCardLike)
    .classList.toggle('cards__button-like_aktive');
  }

  createCard(){
    this._view = this._getTemplate();
    const cardText = this._view.querySelector(this._config.cardText)
    const cardPhoto = this._view.querySelector(this._config.cardPhoto)
    cardText.textContent = this._name;
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._addEventListeners();
    return this._view;
  }
};

export default Card;