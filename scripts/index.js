import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, popupImage} from './utils.js';

const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const popupProfile = document.querySelector('.popup_type_profile')
const popupAddCard = document.querySelector('.popup_type_addcard')
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
const popupImg = popupImage.querySelector('.popup__big-image')
const popupText = popupImage.querySelector('.popup__image-text')
const closeButtons = document.querySelectorAll('.popup__close-button');

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

function handleCardClick(name, link) {
  popupImg.src = link;
  popupText.textContent = name; 
  popupImg.alt = name; 
  openPopup (popupImage) 
}

const cardsContainer = document.querySelector(config.cardsList);

  const addCard = (name, link) => {
  cardsContainer.prepend(getCard(name, link));
}

const getCard = (name, link) => {
const card = new Card(config, name, link, handleCardClick)
const cardElement = card.createCard();
return cardElement;
};

initialCards.forEach(card => addCard(card.name, card.link));

const addCardValidator = new FormValidator(config, formElementAddCard);
addCardValidator.enableValidation(formElementAddCard);

const profileValidator = new FormValidator(config, formElementProfile);
profileValidator.enableValidation(formElementProfile);

buttonEdit.addEventListener('click', function() {
  openPopup (popupProfile)
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
  profileValidator.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  formElementAddCard.reset();
  openPopup (popupAddCard);
  addCardValidator.resetValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const handleCardSubmit = e => {
  e.preventDefault();
  const nameValue = cardnameFieldElement.value
  const linkValue = cardlinkFieldElement.value
  addCard(nameValue, linkValue);
  closePopup(popupAddCard);
};

const handleProfileSubmit = e => {
  e.preventDefault();
  usernameProfileElement.textContent = usernameFieldElement.value
  bioProfileElement.textContent = bioFieldElement.value
  closePopup (popupProfile)
};

formElementProfile.addEventListener('submit', handleProfileSubmit);

formElementAddCard.addEventListener('submit', handleCardSubmit);