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
const buttonEdit = document.querySelector('.profile-info__edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const popupProfile = document.querySelector('.popup_type_profile')
const popupAddCard = document.querySelector('.popup_type_addcard')
const popupImage = document.querySelector('.popup_type_img-increase')
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
const popupSubmButtonElement = document.querySelector('.popup__subm-button')
const cardsTemplateElement = document.querySelector('.cards__template')
const cardsListElement = document.querySelector('.cards');
const getCardByEvent = e => e.currentTarget.closest('.cards__card');
const popupImg = popupImage.querySelector('.popup__big-image')
const popupText = popupImage.querySelector('.popup__image-text')

// enableValidation();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

function openPopupImage(name, link) { 
  popupImg.src = link; 
  popupText.textContent = name; 
  popupImg.alt = name; 
  openPopup (popupImage) 
}  
const createCard = (nameValue, linkValue) => {
  const card = cardsTemplateElement.content
  .querySelector('.cards__card')
  .cloneNode(true);
  const cardText = card.querySelector('.cards__text')
  const cardPhoto = card.querySelector('.cards__photo')
  cardText.textContent = nameValue;
  cardPhoto.src = linkValue;
  cardPhoto.alt  = nameValue;
  cardPhoto.addEventListener('click',()  => openPopupImage(nameValue, linkValue));
  card.querySelector('.cards__button-delete').addEventListener('click', deleteCard);
  card.querySelector('.cards__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_aktive')
  });
  return card;
};
const addCard = (name, link) => {
  const card = createCard(name, link)
  cardsListElement.prepend(card);
};
const deleteCard = e => {
  const card = getCardByEvent(e);

  card.remove();
};
const handleCardSubmit = e => {x
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
}

initialCards.forEach(card => addCard(card.name, card.link));

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
};

buttonEdit.addEventListener('click', function() {
  openPopup (popupProfile)
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
});
buttonAdd.addEventListener('click', function() {
  formElementAddCard.reset();
  openPopup (popupAddCard)
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

formElementProfile.addEventListener('submit', handleProfileSubmit);

formElementAddCard.addEventListener('submit', handleCardSubmit);