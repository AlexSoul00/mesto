class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector){
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
    this._avatarSelector = avatarSelector
    this._usernameProfileElement = document.querySelector(this._nameSelector);
    this._bioProfileElement = document.querySelector(this._bioSelector);
    this._avatarProfileElement = document.querySelector(this._avatarSelector);
  }

  setUserInfo(name, about){
    this._usernameProfileElement.textContent = name;
    this._bioProfileElement.textContent = about;
  }

  setAvatar(avatar){
    this._avatarProfileElement.src = avatar;
  }

  getUserInfo(){
    const data = {
      name: this._usernameProfileElement.textContent ,
      bio: this._bioProfileElement.textContent
    }
    return data;
  }
}

export {UserInfo};