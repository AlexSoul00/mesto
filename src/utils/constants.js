const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const buttonAvatar = document.querySelector('.profile__avatar-edit')
const usernameFieldElement = document.querySelector('.popup__input_username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const formElementProfile = document.querySelector('.popup__form_type_profile')
const formElementAddCard = document.querySelector('.popup__form_type_addcard')
const formElementAvatar = document.querySelector('.popup__form_type_update-avatar')
const config = {
  cardsList: '.cards',
  cardTemplate: '.card__template',
  cardsListTemplate: '.cards__template',
  cardText: '.cards__text',
  cardPhoto: '.cards__photo',
  cardLikeCounter: '.cards__like-counter',
  buttonCardDelete: '.cards__button-delete',
  buttonCardLike: '.cards__button-like',
  buttonCardLikeActive: 'cards__button-like_aktive',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const cardsList = config.cardsList;

export {buttonEdit, buttonAdd, usernameFieldElement, bioFieldElement, formElementProfile, formElementAddCard, formElementAvatar, buttonAvatar, cardsList, config}