class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res){
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders(){
    return {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  }

  getInitialCards(){
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  createCard(name, link){
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({name, link})
    })
    .then(this._getJsonOrError)
  }

  deleteCard(id){
    return fetch(`${this._host}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  getUser(){
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  updateAvatar(avatar){
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({avatar})
    })
    .then(this._getJsonOrError)
  }

  updateProfile(name, about){
  return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({name, about})
    })
    .then(this._getJsonOrError)
  }

  likeCard(id){
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
      body: JSON.stringify({id})
    })
    .then(this._getJsonOrError)
  }

  removeLikeCard(id){
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  getAllStartData(){
    return Promise.all([this.getUser(), this.getInitialCards()])
  }

}


export {Api};