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

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-47', {
authorization: '5aaa6758-f41e-4b2f-b957-f168a1ced472',
'Content-Type': 'application/json'})

let profileId = null;

const getCard = (data) => {
  const card = new Card(config, data, profileId, {
    handleCardDeleteClick: (data) => {
      popupConfirm.open();
      console.log(card)
      console.log(card._data)
      console.log(card._data._id)
      popupConfirm.handleSubmitConfirm(() => {
        api.deleteCard(card._data)
        .then(() => {
          card.deleteCard();
          popupConfirm.close();
        })
        .catch((err) => {
          console.log(err);
        })
      })
  },
    handleCardClick : (data) => {
      popupImage.open(data)
    },
    handleLikeCardClick: () => {
      console.log(data._id)
      console.log(data)
      console.log(data.likes)
      if (card.isLikedCheck()) {
        api.removeLikeCard(data._id)
        .then((data) => {
          card.deleteLikeView();
          card.setLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.likeCard(data._id)
        .then((data) => {
          card.addLikeView();
          card.setLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  })
  const cardElement = card.createCard();
  return cardElement;
  };

const userInfo = new UserInfo('.profile-info__username', '.profile-info__bio', '.profile__avatar')

const popupImage = new PopupWithImage('.popup_type_img-increase');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit:
  (data) => {
    popupProfile.loadingAnimation(true)
    api.updateProfile(data.name, data.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about)
      popupProfile.close();
    })
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
    .then((data) => {
      cardsContainer.addItem(getCard(data));
      popupAddCard.close();
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
    .then((data) => {
      userInfo.setAvatar(data.avatar)
      popupAvatar.close();
    })
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
  handleSubmit: (data) => {
    api.deleteCard(data)
    .then(() => {
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
}
})
popupConfirm.setEventListeners();


const addCardValidator = new FormValidator(config, formElementAddCard);
addCardValidator.enableValidation(formElementAddCard);

const profileValidator = new FormValidator(config, formElementProfile);
profileValidator.enableValidation(formElementProfile);

const avatarUpdateValidator = new FormValidator(config, formElementAvatar);
avatarUpdateValidator.enableValidation(formElementAvatar)

const cardsContainer = new Section({
  renderer: (data) => {
    const card = getCard(data);
    cardsContainer.addItem(card);
  }}, cardsList );

api.getAllStartData()
.then((data) => {
  const [userData, initialCards] = data;
  profileId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about)
  userInfo.setAvatar(userData.avatar)
  cardsContainer.setItimes(initialCards);
  cardsContainer.renderItems(initialCards)
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
