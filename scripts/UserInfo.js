class UserInfo {
  constructor(nameSelector, bioSelector){
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
    this._usernameProfileElement = document.querySelector(this._nameSelector);
    this._bioProfileElement = document.querySelector(this._bioSelector);
  }

  setUserInfo(name, about){
    this._usernameProfileElement.textContent = name;
    this._bioProfileElement.textContent = about;
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