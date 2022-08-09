class Card {
  constructor(config, name, link, handleCardClick){
    this._config = config;
    this._name = name;
    this._link = link; 
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    return document.querySelector(this._config.cardTemplate)
    .content
    .children[0]
    .cloneNode(true);
  }

  createCard(){
    this._view = this._getTemplate();
    this._cardText = this._view.querySelector(this._config.cardText)
    this._cardImage = this._view.querySelector(this._config.cardPhoto)
    this._deleteButton = this._view.querySelector(this._config.buttonCardDelete)
    this._likeButton = this._view.querySelector(this._config.buttonCardLike)
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._addEventListeners();
    return this._view;
  }

  _addEventListeners(){
    this._deleteButton.addEventListener('click', (evt) => {
      this._deleteCard(evt);
    })
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteCard(){
    this._view.remove();
    this._view = null;
  }

  _likeCard(){
    this._likeButton.classList.toggle('cards__button-like_aktive');
  }
};

export {Card};