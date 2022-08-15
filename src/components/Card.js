class Card {
  constructor(config, name, link, _id, likes, owner, user, handleCardClick, deleteCardFromServer, likeCardOnServer, removeLikeCardOnServer, handleCardDeleteClick){
    this._config = config;
    this._name = name;
    this._link = link; 
    this._cardId = _id;
    this._likes = likes;
    this._owner = owner;
    this._ownerId = this._owner._id
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._deleteCardFromServer = deleteCardFromServer;
    this._likeCardOnServer = likeCardOnServer;
    this._removeLikeCardOnServer = removeLikeCardOnServer;
    this._handleCardDeleteClick = handleCardDeleteClick;
    // this._deleteCard = this._deleteCard.bind(this);
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
    this._likeCounter = this._view.querySelector(this._config.cardLikeCounter)
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._addEventListeners();
    this._removeDeleteButton();
    return this._view;
  }

  _addEventListeners(){
    this._deleteButton.addEventListener('click', this._handleCardDeleteClick);

    this._likeButton.addEventListener('click', () => {
      this._checkLike();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _removeDeleteButton(){
    if(this._ownerId !== this._userId){
      this._deleteButton.remove();
    }
  }

  _checkLike(){
    if (this._likeButton.classList.contains('cards__button-like_aktive')) {
      this._removeCardLike()
    }
    else {
      this._likeCard();
    }
  }

  _likeCard(){
      this._likeCardOnServer(this._cardId)
    .then((res) => {
      this._likeButton.classList.add(this._config.buttonCardLikeActive);
      this._likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _removeCardLike(){
    this._removeLikeCardOnServer(this._cardId)
    .then((res) => {
      this._likeButton.classList.remove(this._config.buttonCardLikeActive);
      this._likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }

}

export {Card};