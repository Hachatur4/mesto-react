import React from 'react';
import Header from './Header.js'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAppInfo()
      .then(([cards, userData])=>{
        setCards(cards)
        setCurrentUser(userData)
      })
      .catch((err)=> console.log(`catch: ${err}`))
  },[]);

  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick (){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick (){
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
  }

  function handleCardLike(card){
      api.putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err)=> console.log(`catch: ${err}`))
  }
  function handleCardLikeDelete(card){
    api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id != card._id));
    })
    .catch((err)=> console.log(`catch: ${err}`))
  }

  function handleUpdateUser(data){
    api.sendUserInfo(data)
    .then((res) => {
      setCurrentUser(res)
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      closeAllPopups()
    })
    
  }

  function handleUpdateAvatar(data){
    api.userAvatar(data)
    .then((res) => {
      setCurrentUser(res)
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      closeAllPopups()
    })
  }

  function handleAddPlaceSubmit (cardData){
    api.createCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
    })
    .catch((err)=> console.log(`catch: ${err}`))
    .finally(()=>{
      closeAllPopups()
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardLikeDelete={handleCardLikeDelete}
        cards={cards}
        onCardDelete={handleCardDelete}
      />
      <Footer/>
      <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
