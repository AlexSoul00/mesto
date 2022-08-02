const popupImage = document.querySelector('.popup_type_img-increase')
const popupImg = popupImage.querySelector('.popup__big-image')
const popupText = popupImage.querySelector('.popup__image-text')
const formElementAddCard = document.querySelector('.popup__form_type_addcard')

function openPopupImage(name, link) { 
  popupImg.src = link; 
  popupText.textContent = name; 
  popupImg.alt = name; 
  openPopup (popupImage) 
}  

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  document.addEventListener('mousedown', handleOverlay)
  document.addEventListener('keydown', handlerEscButton)
};

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
    formElementAddCard.reset();
  }
};

function handlerEscButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
  document.removeEventListener('mousedown', handleOverlay)
  document.removeEventListener('keydown', handlerEscButton)
};

export {openPopupImage, openPopup, closePopup, popupImage}