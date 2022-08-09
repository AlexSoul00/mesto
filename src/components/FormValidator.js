class FormValidator {
  constructor(config, popupFormElement){
    this._config = config;
    this._popupFormElement = popupFormElement;
    this._inputList = Array.from(popupFormElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = popupFormElement.querySelector(this._config.submitButtonSelector);
  }

  _hideInputError(inputElement){
    const errorElement = this._popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _showInputError(inputElement){
    const errorElement = this._popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _checkInputValidity(inputElement){
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
    else {
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput(){
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _setDisableButton(){
    this._buttonElement.disabled = true;
  }

  _setEnableButton(){
    this._buttonElement.disabled = false;
  }

  _toggleButtonSubm(){
    if (this._hasInvalidInput()) {
      this._setDisableButton();
    } else {
      this._setEnableButton();
  }
};

  _addEventListeners(){
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonSubm(); 
        });
      })
    };

  enableValidation(){ 
    this._addEventListeners(this._popupFormElement); 
  }

  resetValidation() {
    this._toggleButtonSubm();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    }); 
  }
}

export {FormValidator};