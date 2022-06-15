const editButton = document.querySelector('.profile-info__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close-button')
const usernameFieldElement = document.querySelector('.popup__input_username')
const usernameProfileElement = document.querySelector('.profile-info__username')
const bioFieldElement = document.querySelector('.popup__input_bio')
const bioProfileElement = document.querySelector('.profile-info__bio')
const formElement = document.querySelector('.popup__form')

function openPopup(popupElement) {
  popupElement.classList.add('popup_aktive')
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_aktive')
}

editButton.addEventListener('click', function() {
  openPopup (popup)
  usernameFieldElement.value = usernameProfileElement.textContent
  bioFieldElement.value = bioProfileElement.textContent
})

closePopupButton.addEventListener('click', function() {
  closePopup (popup)
})

formElement.addEventListener('submit', function(event) {
  event.preventDefault()
  usernameProfileElement.textContent = usernameFieldElement.value
  bioProfileElement.textContent = bioFieldElement.value
  closePopup (popup)
})


