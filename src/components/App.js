import React from 'react';
import Header from './Header.js'
import Main from './Main'
import Footer from './Footer'
import PopupForm from './PopupWithForm.js'
import PopupImage from './ImagePopup.js'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

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
    setSelectedCard(false)
  }

  return (
    <div className="page">
      <Header/>
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer/>
      <PopupImage 
      card={selectedCard} 
      onClose={closeAllPopups}
      />
      <PopupForm 
        name='card' 
        title='Новое место' 
        buttonTitle='Создать' 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}>
            <label className="form__field">
              <input
                type="text"
                name="name"
                id="name-input"
                className="form__input form-card__input"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="form__input-error name-input-error"></span>
            </label>
            <label className="form__field">
              <input
                type="url"
                name="link"
                id="link-input"
                className="form__input form-card__input"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__input-error link-input-error"></span>
            </label>
      </PopupForm>
      <PopupForm 
        name='profile' 
        title='Редактировать профиль' 
        buttonTitle='Сохранить' 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
            <label className="form__field">
              <input
                type="text"
                name="profileName"
                id="username-input"
                className="form__input form-profile__input"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="form__input-error username-input-error"></span>
            </label>
            <label className="form__field">
              <input
                type="text"
                name="profileJob"
                id="job-input"
                className="form__input form-profile__input"
                placeholder="Сфера деятельности"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="form__input-error job-input-error"></span>
            </label>
      </PopupForm>
      <PopupForm 
        name='changeAvatar' 
        title='Обновить аватар' 
        buttonTitle='Сохранить' 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}>
            <label className="form__field">
              <input
                type="url"
                name="avatarLink"
                id="avatar-input"
                className="form__input form-avatar__input"
                placeholder="Ссылка на изображение"
                required
              />
              <span className="form__input-error avatar-input-error"></span>
            </label>
      </PopupForm>
    </div>
  );
}

export default App;
