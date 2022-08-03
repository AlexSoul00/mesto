class FormValidator {
  constructor(config, popupElement){
    this._config = config;
    this._popupElement = popupElement;
    this._inputList = Array.from(popupElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = popupElement.querySelector(this._config.submitButtonSelector);
  }

  _hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _showInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _checkInputValidity(formElement, inputElement){
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    }
    else {
      this._showInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList){
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _setDisableButton(buttonElement){
    this._buttonElement.disabled = true;
  }

  _setEnableButton(buttonElement){
    this._buttonElement.disabled = false;
  }

  _toggleButtonSubm(buttonElement, inputList){
    if (this._hasInvalidInput(inputList)) {
      this._setDisableButton(buttonElement);
    } else {
      this._setEnableButton(buttonElement);
  }
};

  _addEventListeners(formElement){
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleButtonSubm(this._buttonElement, this._inputList); 
        });
      })
    };

  enableValidation(){ 
    this._addEventListeners(this._popupElement); 
  }

  resetValidation() {
    this._toggleButtonSubm(this._buttonElement, this._inputList);
    
  }
}

export {FormValidator};