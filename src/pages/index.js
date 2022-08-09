import './index.css'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {buttonEdit, buttonAdd, usernameFieldElement, bioFieldElement, formElementProfile, formElementAddCard, cardsList, config, initialCards} from '../utils/constants.js';

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

const getCard = (name, link) => {
  const card = new Card(config, name, link, handleCardClick)
  const cardElement = card.createCard();
  return cardElement;
  };

  const addCard = (name, link) => {
    cardsContainer.addItem(getCard(name, link));
  } 

const userInfo = new UserInfo('.profile-info__username', '.profile-info__bio')
const popupImage = new PopupWithImage('.popup_type_img-increase');
const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit:
  (data) => {userInfo.setUserInfo(data.name, data.about)}
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_addcard', {
  handleFormSubmit:
  (data) => {addCard(data.title, data.link)}
});
popupAddCard.setEventListeners();

const addCardValidator = new FormValidator(config, formElementAddCard);
addCardValidator.enableValidation(formElementAddCard);

const profileValidator = new FormValidator(config, formElementProfile);
profileValidator.enableValidation(formElementProfile);

const cardsContainer = new Section({
  items: initialCards, renderer: (item) => {
    const card = getCard(item.name, item.link);
    cardsContainer.addItem(card);
  }}, cardsList );

  cardsContainer.renderItems();

buttonEdit.addEventListener('click', function() {
  const data = userInfo.getUserInfo();
  usernameFieldElement.value = data.name;
  bioFieldElement.value = data.bio;
  popupProfile.open();
  profileValidator.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  formElementAddCard.reset();
  popupAddCard.open();
  addCardValidator.resetValidation();
});