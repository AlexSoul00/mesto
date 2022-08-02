class FormValidator {
  constructor(config, popupElement){
    this._config = config;
    this._popupElement = popupElement;
    this._formList = Array.from(document.querySelectorAll(this._config.formSelector));
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
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  setDisableButton(buttonElement){
    buttonElement.disabled = true;
  }

  _setEnableButton(buttonElement){
    buttonElement.disabled = false;
  }

  _toggleButtonSubm(buttonElement, inputList){
    if (this._hasInvalidInput(inputList)) {
      this.setDisableButton(buttonElement);
    } else {
      this._setEnableButton(buttonElement);
  }
};

  _addEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleButtonSubm(buttonElement, inputList); 
        });
      })
      this._toggleButtonSubm(buttonElement, inputList);
    };

  enableValidation(){
    this._formList.forEach(formElement => {
      this._addEventListeners(formElement);
    })
  }
}

export {FormValidator};