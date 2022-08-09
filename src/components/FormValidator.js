class FormValidator {
  constructor(config, popupFormElement){
    this._config = config;
    this._popupFormElement = popupFormElement;
    this._inputList = Array.from(popupFormElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = popupFormElement.querySelector(this._config.submitButtonSelector);
  }

  _hideInputError(popupFormElement, inputElement){
    const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _showInputError(popupFormElement, inputElement){
    const errorElement = popupFormElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _checkInputValidity(popupFormElement, inputElement){
    if (inputElement.validity.valid) {
      this._hideInputError(this._popupFormElement, inputElement);
    }
    else {
      this._showInputError(this._popupFormElement, inputElement);
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
    if (this._hasInvalidInput(this._inputList)) {
      this._setDisableButton(this._buttonElement);
    } else {
      this._setEnableButton(this._buttonElement);
  }
};

  _addEventListeners(){
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(this._popupFormElement, inputElement);
          this._toggleButtonSubm(this._buttonElement, this._inputList); 
        });
      })
    };

  enableValidation(){ 
    this._addEventListeners(this._popupFormElement); 
  }

  resetValidation() {
    this._toggleButtonSubm(this._buttonElement, this._inputList);
    
  }
}

export {FormValidator};