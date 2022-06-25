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
const editButton = document.querySelector('.profile-info__edit-button')
const addButton = document.querySelector('.profile__add-button')
const profilePopup = document.querySelector('.popup_type_profile')
const addcardPopup = document.querySelector('.popup_type_addcard')
const profileClosePopupButton = document.querySelector('.popup__close-button_type_profile')
const addcardClosePopupButton = document.querySelector('.popup__close-button_type_addcard')
const usernameProfileElement = document.querySelector('.profile-info__username')
const bioProfileElement = document.querySelector('.profile-info__bio')
const usernameFieldElement = document.querySelector('.popup__input_username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const cardnameFieldElement = document.querySelector('.popup__input_cardname')
const cardlinkFieldElement = document.querySelector('.popup__input_cardlink')
const popupTitleElement = document.querySelector('.popup__title')
const formElement = document.querySelector('.popup__form')


const profileFormElement = document.querySelector('.popup__form_type_profile')
const addcardFormElement = document.querySelector('.popup__form_type_addcard')

const popupSubmButtonElement = document.querySelector('.popup__subm-button')


const cardsTemplateElement = document.querySelector('.cards__template')
const cardsListElement = document.querySelector('.cards');
const getCardByEvent = e => e.currentTarget.closest('.cards__card');


const popupPhoto = document.querySelector('.popupphoto')
const closePopupPhotoButton = document.querySelector('.popupphoto__close-button')

function openPopupWindow(evt) {
  popupPhoto.querySelector('.popupphoto__img').src = evt.querySelector('.cards__photo').src
  popupPhoto.querySelector('.popupphoto__text').textContent = evt.querySelector('.cards__text').textContent
  openPopupPhoto(popupPhoto)
}

const createCard = (nameValue, linkValue) => {
  const card = cardsTemplateElement.content
  .querySelector('.cards__card')
  .cloneNode(true);
  card.querySelector('.cards__text').textContent = nameValue;
  card.querySelector('.cards__photo').src = linkValue;
  card.querySelector('.cards__photo').addEventListener('click', evt => openPopupWindow(evt.target.closest('.cards__card')));
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
const handleSubmitForm = e => {
  e.preventDefault();
};

initialCards.forEach(card => addCard(card.name, card.link));

function openPopup(popupElement) {
  popupElement.classList.add('popup_aktive')
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_aktive')
};

editButton.addEventListener('click', function() {
  openPopup (profilePopup)
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
});
addButton.addEventListener('click', function() {
  formElement.reset();
  openPopup (addcardPopup)
});
profileClosePopupButton.addEventListener('click', function() {
  closePopup (profilePopup)
});
addcardClosePopupButton.addEventListener('click', function() {
  closePopup (addcardPopup)
});

formElement.addEventListener('submit', function(event) {
  event.preventDefault()
  {
  usernameProfileElement.textContent = usernameFieldElement.value
  bioProfileElement.textContent = bioFieldElement.value
  closePopup (profilePopup)
  }
  }
)

addcardFormElement.addEventListener('submit', function(event) {
  event.preventDefault()
  {
    const nameValue = cardnameFieldElement.value
    const linkValue = cardlinkFieldElement.value
    addCard(nameValue, linkValue);
    closePopup(addcardPopup);
    addcardFormElement.reset();
  }
}
)


function openPopupPhoto(popupPhotoElement) {
  popupPhotoElement.classList.add('popupphoto_aktive')
};
function closePopupPhoto(popupPhotoElement) {
  popupPhotoElement.classList.remove('popupphoto_aktive')
};
closePopupPhotoButton.addEventListener('click', function() {
  closePopupPhoto (popupPhoto)
});