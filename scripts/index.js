import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';

const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const usernameFieldElement = document.querySelector('.popup__input_username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const formElementProfile = document.querySelector('.popup__form_type_profile')
const formElementAddCard = document.querySelector('.popup__form_type_addcard')

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
  cardTemplate: '.card__template',
  cardsListTemplate: '.cards__template',
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

const cardsList = config.cardsList;

const userInfo = new UserInfo('.profile-info__username', '.profile-info__bio')
const popupImage = new PopupWithImage('.popup_type_img-increase');
const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit:
  (data) => {userInfo.setUserInfo(data.name, data.about)}
});
const popupAddCard = new PopupWithForm('.popup_type_addcard', {
  handleFormSubmit:
  (data) => {addCard(data.name, data.link)}
});

const addCardValidator = new FormValidator(config, formElementAddCard);
addCardValidator.enableValidation(formElementAddCard);

const profileValidator = new FormValidator(config, formElementProfile);
profileValidator.enableValidation(formElementProfile);

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

const getCard = (name, link) => {
  const card = new Card(config, name, link, handleCardClick)
  const cardElement = card.createCard();
  return cardElement;
  };

const cardsContainer = new Section({
  items: initialCards, renderer: (item) => {
    const card = getCard(item.name, item.link);
    cardsContainer.addItem(card);
  }}, cardsList );

  cardsContainer.renderItems();

  const addCard = (name, link) => {
    cardsContainer.addItem(getCard(name, link));
  } 

buttonEdit.addEventListener('click', function() {
  const data = userInfo.getUserInfo();
  usernameFieldElement.value = data.name;
  bioFieldElement.value = data.bio;2
  popupProfile.open();
  profileValidator.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  formElementAddCard.reset();
  popupAddCard.open();
  addCardValidator.resetValidation();
});