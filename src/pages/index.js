import './index.css'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupConfirm} from '../components/PopupConfirm.js';
import {buttonEdit, buttonAdd, usernameFieldElement, bioFieldElement, formElementProfile, formElementAddCard, formElementAvatar, buttonAvatar, cardsList, config} from '../utils/constants.js';

const api = new Api (config.host, config.token)

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

function handleCardDeleteClick(){
  popupConfirm.open();
}

function deleteCard(id){
  return api.deleteCard(id);
}

function likeCard(id){
  return api.likeCard(id);
}

function removeLikeCard(id){
  return api.removeLikeCard(id)
}

const getCard = (name, link, _id, likes, owner, user) => {
  const card = new Card(config, name, link, _id, likes, owner, user, handleCardClick, deleteCard, likeCard, removeLikeCard, handleCardDeleteClick)
  const cardElement = card.createCard();
  return cardElement;
  };

const userInfo = new UserInfo('.profile-info__username', '.profile-info__bio')

const popupImage = new PopupWithImage('.popup_type_img-increase');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit:
  (data) => {
    popupProfile.loadingAnimation(true)
    api.updateProfile(data.name, data.about)
    .then((data) => userInfo.setUserInfo(data.name, data.about))
    .catch((err) => {
      console.log(err);
    })
      .finally(() => {
        popupProfile.loadingAnimation(false);
      })
  }
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_addcard', {
  handleFormSubmit:
  (data) => {
    popupAddCard.loadingAnimation(true)
    api.createCard(data.title, data.link)
    .then((res) => {
      cardsContainer.addItem(getCard(res.name, res.link, res._id, res.owner, res.likes));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
    popupAvatar.loadingAnimation(false);
  })
  }
});
popupAddCard.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_update-avatar', {
  handleFormSubmit:
  (data) => {
    popupAvatar.loadingAnimation(true)
    api.updateAvatar(data.link)
    .then((data) => userInfo.setAvatar(data.avatar))
    .catch((err) => {
    console.log(err);
  })
    .finally(() => {
      popupAvatar.loadingAnimation(false);
    })
  }
});
popupAvatar.setEventListeners();

const popupConfirm = new PopupConfirm('.popup_type_confirm', {
  submit:(data) => {
    popupConfirm.loadingAnimation(true)
    api.deleteCard(data._id)
      .then(() => {
        PopupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupConfirm.loadingAnimation(false);
      })
  }
})

const addCardValidator = new FormValidator(config, formElementAddCard);
addCardValidator.enableValidation(formElementAddCard);

const profileValidator = new FormValidator(config, formElementProfile);
profileValidator.enableValidation(formElementProfile);

const avatarUpdateValidator = new FormValidator(config, formElementAvatar);
avatarUpdateValidator.enableValidation(formElementAvatar)

const cardsContainer = new Section({
  renderer: (item) => {
    const card = getCard(item.name, item.link, item._id, item.likes, item.owner, item.userId);
    cardsContainer.addItem(card);
  }}, cardsList );

api.getAllStartData()
.then((data) => {
  const [userData, initialCards] = data;
  const profileId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about)
  userInfo.setAvatar(userData.avatar)
  cardsContainer.setItimes(initialCards);
  cardsContainer.renderItems(profileId)
})
.catch((err) => {
  console.log(err);
}); 


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

buttonAvatar.addEventListener('click', () => {
  formElementAvatar.reset();
  popupAvatar.open();
  avatarUpdateValidator.resetValidation();
})
