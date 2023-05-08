import { useState, useEffect } from 'react'; 
import { api } from '../utils/api';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then(cards => setCards(cards))
        .catch(err => console.log(`${err}`))
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then(user => setCurrentUser(user))
        .catch(err => console.log(`${err}`))
    }
  }, [isLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            handleLogin();
            history.push("/")
          }
        })
        .catch(err => console.log(`${err}`));
    }
  }, [])


  function handleLogin() {
    setIsLoggedIn(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenInfoTooltip(false);
    setSelectedCard(null);
  }

  function handleInfoTooltipPopupOpen() {
    setIsOpenInfoTooltip(true)
  }

  function closeOnOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`${err}`))
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`${err}`))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
        closeAllPopups()
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.editProfile(user)
      .then((res) => {
        setCurrentUser(res)
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleLoginSubmit(data) {
    auth.authorize(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setEmail(data.email);
        handleLogin();
      })
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(`${err}`)
        handleInfoTooltipPopupOpen();
      })
  }

  function handleRegistrationSubmit(data) {
    auth.register(data)
      .then((res) => {
        if (res) {
          setRequestStatus(true)
          handleInfoTooltipPopupOpen();
        }
      })
      .then(() => history.push("/sign-in"))
      .catch((err) => {
        console.log(`${err}`)
        setRequestStatus(false)
        handleInfoTooltipPopupOpen();
      })
  }

  function handleSignOut() {
    localStorage.removeItem("token");
  }

  return (
  <div className="page"> 
    <CurrentUserContext.Provider value={currentUser}>
    <Header emailUser={email} onSignOut={handleSignOut}/>
      <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            >
            {/* main */}
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register onSubmit={handleRegistrationSubmit}/>
            </Route>
            <Route path="/sign-in">
              <Login onSubmit={handleLoginSubmit} />
            </Route>
            <Route>
              <Redirect to="/"  />
            </Route>
          </Switch>
          {isLoggedIn && <Footer />}
    {/* Popup edit profile */}
      <EditProfilePopup
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closeOnOverlayClick}
        onUpdateUser={handleUpdateUser} />
    {/* Popup change Avatar */}
      <EditAvatarPopup
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closeOnOverlayClick}
        onUpdateAvatar={handleUpdateAvatar} />
    {/* Popup add place */}
      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />
    {/* Image popup */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOverlay={closeOnOverlayClick} />
      <InfoTooltip
        onClose={closeAllPopups} 
        isOpen={isOpenInfoTooltip}
        isRequestStatus={requestStatus} />
    </CurrentUserContext.Provider> 
  </div> 
    );
  }

  export default App;