
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Switch, useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Rigister'
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'
import Success from '../images/Success.svg'
import unSuccess from '../images/unSuccess.svg'


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)
    const history = useHistory()
    const [email, setEmail] = React.useState('')
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [message, setMessage] = React.useState({ img: '', text: '' })

    React.useEffect(() => {
        api.getApiUserInfo().then((data) => {
            setCurrentUser(data)
        })
            .catch((err) => console.log(err))
    }, [])

    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function onUpdateUser(userData) {
        api.setApiUserInfo(userData)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function onUpdateAvatar(userData) {
        api.setAvatar(userData)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(cardData) {
        api.postCards(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item !== card))
            })
            .catch((err) => console.log(err))
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function onCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setSelectedCard(null)
        setIsInfoTooltipOpen(false)
    }

    React.useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            closeAllPopups();
          }
        }
  
        document.addEventListener('keydown', closeByEscape)
        
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])
  

    React.useEffect(() => {
        tokenCheck()
    }, [])
   
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt')
   
        if(jwt) {
          auth.checkToken(jwt)
            .then((res) => {
              if(res) {
                setLoggedIn(true)
                setEmail(res.data.email)
                history.push('/')
              }
            })
            .catch((err) => console.log(err))
        }
      }

    function handleRegistration(password, email) {
        auth.register(password, email)
          .then((result) => {
            setEmail(result.data.email)
            setMessage({ img: Success, text: 'Вы успешно зарегистрировались!' })
            history.push('/sign-in')
          })
          .catch(() => setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
          .finally(() => setIsInfoTooltipOpen(true))
        }
    
        function handleAuth(password, email) {
            auth.authorize(password, email)
              .then((data) => {
                setLoggedIn(true)
                localStorage.setItem('jwt', data.token)
                history.push('/')
                setEmail(email)
              })
              .catch((err) => console.log(err))
            }
    
      function onSignOut() {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
      }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut}/>
                <Switch>
                    <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={onCardClick} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} cards={cards}/>
                    <Route path='/sign-in'>
                        <Register isOpen={isEditProfilePopupOpen} onRegister={handleRegistration} isInfoTooltipOpen={isInfoTooltipOpen}/>
                    </Route>
                    <Route path='/sign-up'>
                        <Login isOpen={isEditProfilePopupOpen} onAuth={handleAuth}/>
                    </Route>
                </Switch>
                <Footer />

                <InfoTooltip name='tooltip' isOpen={isInfoTooltipOpen} onClose={closeAllPopups} title={message.text} img={message.img}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={onUpdateUser} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={onUpdateAvatar} />
            </div>
        </CurrentUserContext.Provider >
    );
}

export default App;