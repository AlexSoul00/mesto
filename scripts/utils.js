const popupImage = document.querySelector('.popup_type_img-increase')

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  document.addEventListener('mousedown', handleOverlay)
  document.addEventListener('keydown', handlerEscButton)
};

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
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

export {openPopup, closePopup, popupImage}