class Api {
  constructor(host, headers) {
    this._host = host;
    this._headers = headers;
    this._getJsonOrError = this._getJsonOrError.bind(this);
  }

  _getJsonOrError(res){
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(){
    return fetch(`${this._host}/cards`, {
      headers: this._headers
    })
    .then(this._getJsonOrError)
  }

  createCard(name, link){
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(this._getJsonOrError)
  }

  deleteCard(data){
    return fetch(`${this._host}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getJsonOrError)
  }

  getUser(){
    return fetch(`${this._host}/users/me`, {
      headers: this._headers
    })
    .then(this._getJsonOrError)
  }

  updateAvatar(avatar){
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(this._getJsonOrError)
  }

  updateProfile(name, about){
  return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(this._getJsonOrError)
  }

  likeCard(id){
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({id})
    })
    .then(this._getJsonOrError)
  }

  removeLikeCard(id){
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getJsonOrError)
  }

  getAllStartData(){
    return Promise.all([this.getUser(), this.getInitialCards()])
  }

}

export {Api};