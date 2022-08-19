class Card {
  constructor(config, data, profileId, {handleCardDeleteClick, handleCardClick, handleLikeCardClick}){
    this._config = config;
    this._data = data;
    this._profileId = profileId;
    this._name = data.name;
    this._link = data.link; 
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleLikeCardClick = handleLikeCardClick
  }

  _getTemplate(){
    return document.querySelector(this._config.cardTemplate)
    .content
    .children[0]
    .cloneNode(true);
  }

  deleteCard(){ 
    this._view.remove(); 
    this._view = null; 
  } 

  deleteCardFromServer(){
    this._deleteCard(this._view)
  }

  _removeDeleteButton(){
      if(this._data.owner._id !== this._profileId){
      this._deleteButton.remove();
    }
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
    this._view.setAttribute('id', this._data._id);
    this._addEventListeners();
    this._removeDeleteButton();
    this.setLikes(this._likes);
    this._checkOwnLike();
    return this._view;
  }

  _addEventListeners(){
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDeleteClick();
    })

    this._likeButton.addEventListener('click', () => {
      this._handleLikeCardClick();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
  }

  isLikedCheck() {
    return this._likes.find(user => user._id === this._profileId)
}

  _checkOwnLike() {
    this.isLikedCheck() ? this.addLikeView() : this.deleteLikeView();
}

  addLikeView(){
    this._likeButton.classList.add('cards__button-like_aktive')
  }

  deleteLikeView(){
    this._likeButton.classList.remove('cards__button-like_aktive')
  }

  setLikes(data){
    this._likes = data;
    this._likeCounter.textContent = this._likes.length;
  }

}

export {Card};