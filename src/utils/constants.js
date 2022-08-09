const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const usernameFieldElement = document.querySelector('.popup__input_username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const formElementProfile = document.querySelector('.popup__form_type_profile')
const formElementAddCard = document.querySelector('.popup__form_type_addcard')
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

export {buttonEdit, buttonAdd, usernameFieldElement, bioFieldElement, formElementProfile, formElementAddCard, cardsList, config, initialCards}