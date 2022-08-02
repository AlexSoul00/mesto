import Card from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, popupImage} from './utils.js';

const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const popupProfile = document.querySelector('.popup_type_profile')
const popupAddCard = document.querySelector('.popup_type_addcard')
const buttonClosePopupProfile = document.querySelector('.popup__close-button_type_profile')
const buttonClosePopupAddCard = document.querySelector('.popup__close-button_type_addcard')
const buttonClosePopupImage = document.querySelector('.popup__close-button_type_img-increase')
const usernameProfileElement = document.querySelector('.profile-info__username')
const bioProfileElement = document.querySelector('.profile-info__bio')
const usernameFieldElement = document.querySelector('.popup__input_username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const cardnameFieldElement = document.querySelector('.popup__input_cardname')
const cardlinkFieldElement = document.querySelector('.popup__input_cardlink')
const popupTitleElement = document.querySelector('.popup__title')
const formElementProfile = document.querySelector('.popup__form_type_profile')
const formElementAddCard = document.querySelector('.popup__form_type_addcard')
const popupSubmButtonElement = document.querySelector('.popup__button')
const cardsListElement = document.querySelector('.cards');
const getCardByEvent = e => e.currentTarget.closest('.cards__card');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const config = {
  cardsList: '.cards',
  cardTemplate: '.cards__template',
  cardText: '.cards__text',
  cardPhoto: '.cards__photo',
  buttonCardDelete: '.cards__button-delete',
  buttonCardLike: '.cards__button-like',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector(config.cardsList);

  const addCard = (name, link) => {
  cardsContainer.prepend(getCard(name, link));
}

const getCard = (name, link) => {
const card = new Card(config, name, link)
const cardElement = card.createCard();
return cardElement;
};

initialCards.forEach(card => addCard(card.name, card.link));

buttonEdit.addEventListener('click', function() {
  openPopup (popupProfile)
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
  const profileValidator = new FormValidator(config, formElementProfile);
  profileValidator.enableValidation(formElementProfile);
});

buttonAdd.addEventListener('click', function() {
  formElementAddCard.reset();
  openPopup (popupAddCard)
  const AddCardValidator = new FormValidator(config, formElementAddCard);
  AddCardValidator.enableValidation(formElementAddCard);
});

buttonClosePopupProfile.addEventListener('click', function() {
  closePopup (popupProfile)
});

buttonClosePopupAddCard.addEventListener('click', function() {
  closePopup (popupAddCard)
});

buttonClosePopupImage.addEventListener('click', function(){
  closePopup (popupImage)
});


const handleCardSubmit = e => {
  e.preventDefault();
  const nameValue = cardnameFieldElement.value
  const linkValue = cardlinkFieldElement.value
  addCard(nameValue, linkValue);
  closePopup(popupAddCard);
  const buttonElement = formElementAddCard.querySelector('.popup__button');
  setDisableButton(buttonElement); 
};

const handleProfileSubmit = e => {
  e.preventDefault();
  usernameProfileElement.textContent = usernameFieldElement.value
  bioProfileElement.textContent = bioFieldElement.value
  closePopup (popupProfile)
};

formElementProfile.addEventListener('submit', handleProfileSubmit);

formElementAddCard.addEventListener('submit', handleCardSubmit);