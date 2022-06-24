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
const popup = document.querySelector('.popup')
const popupPhoto = document.querySelector('.popupphoto')
const closePopupButton = document.querySelector('.popup__close-button')
const closePopupPhotoButton = document.querySelector('.popupphoto__close-button')
const usernameFieldElement = document.querySelector('.popup__input_username')
const usernameProfileElement = document.querySelector('.profile-info__username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const bioProfileElement = document.querySelector('.profile-info__bio')
const formElement = document.querySelector('.popup__form')
const addButton = document.querySelector('.profile__add-button')
const popupTitleElement = document.querySelector('.popup__title')
const popupSubmButtonElement = document.querySelector('.popup__subm-button')
const cardsTemplateElement = document.querySelector('.cards__template')
const cardsListElement = document.querySelector('.cards');
const getCardByEvent = e => e.currentTarget.closest('.cards__card');


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

initialCards.forEach(card => addCard(card.name, card.link));

function openPopup(popupElement) {
  popupElement.classList.add('popup_aktive')
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_aktive')
};
function openPopupPhoto(popupPhotoElement) {
  popupPhotoElement.classList.add('popupphoto_aktive')
};
function closePopupPhoto(popupPhotoElement) {
  popupPhotoElement.classList.remove('popupphoto_aktive')
};

editButton.addEventListener('click', function() {
  openPopup (popup)
  popupTitleElement.textContent =  'Редактировать профиль';
  popupSubmButtonElement.textContent = 'Сохранить';
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
})
addButton.addEventListener('click', function() {
  formElement.reset();
  openPopup (popup)
  popupTitleElement.textContent = 'Новое место';
  popupSubmButtonElement.textContent = 'Создать';
  document.querySelector('[name="username"]').placeholder = 'Название';
  document.querySelector('[name="bio"]').placeholder = 'Ссылка на картинку';
})
closePopupButton.addEventListener('click', function() {
  closePopup (popup)
});
closePopupPhotoButton.addEventListener('click', function() {
  closePopupPhoto (popupPhoto)
});
formElement.addEventListener('submit', function(event) {
  event.preventDefault()
  if (popupTitleElement.textContent === 'Редактировать профиль'){
  usernameProfileElement.textContent = usernameFieldElement.value
  bioProfileElement.textContent = bioFieldElement.value
  closePopup (popup)
  }
  else {
    const nameValue = usernameFieldElement.value
    const linkValue = bioFieldElement.value 
    addCard(nameValue, linkValue);
    closePopup(popup);
    formElement.reset();
  }
  }
)
