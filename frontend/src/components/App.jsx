import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {api} from '../utils/api';
import {auth} from '../utils/auth';

import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  //стейт для проверки, прошла ли регистрация
  const [isSuccessfulSignUp, setIsSuccessfulSignUp] = React.useState(false);
  const [authorisedUserEmail, setAuthorisedUserEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate()

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleTrashIconClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item !== selectedCard);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(data) {
    auth.register(data)
      .then(() => {
        setIsSuccessfulSignUp(true);
        handleInfoTooltipOpen();
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulSignUp(false);
        handleInfoTooltipOpen();
      })
  }

  function tokenCheck() {
    auth.checkToken()
      .then((res) => {
        if (res) {
          setAuthorisedUserEmail(res.email);
          setIsLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        navigate('/signin', { replace: true });
      })
  }

  function handleLogin(data) {
    auth.login(data)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        navigate('/signin')
      })
  }

  function handleLogout() {
    auth.logout()
      .then((res) => {
        if (res) {
          setAuthorisedUserEmail('')
          setIsLoggedIn(false);
          navigate('/signin')
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getProfile()
        .then((profileData) => {
          setCurrentUser(profileData)
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards(cards)
        .then((cardList) => {
          setCards(cardList.reverse());
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        authorisedUserEmail={authorisedUserEmail}
      />
      <Routes>
        <Route path='/signup'
               element={<Register onRegistration={handleRegister}/>}>
        </Route>
        <Route path='/signin'
               element={
                 <Login
                   onAuthorization={handleLogin}
                   onCheckToken={tokenCheck}
                 />}>
        </Route>
        <Route
          path='/'
          element={
            <ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              authorisedUserEmail={authorisedUserEmail}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleTrashIconClick}>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}>
      </AddPlacePopup>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>

      <PopupWithForm
        id='popup-confirm-delete'
        title='Вы уверены?'
        titleButton='Да'
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}>
      </ImagePopup>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessfulSignUp={isSuccessfulSignUp}
      ></InfoTooltip>
    </CurrentUserContext.Provider>
  );
}

export default App;
