import React from 'react'
import api from '../utils/api'
import Card from './Card.js'

function Main (props) {

  const onCardClick = props.onCardClick

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    api.getAppInfo()
      .then(([cards, userData])=>{
        setCards(cards)
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch((err)=> console.log(`catch: ${err}`))
  },[]); 


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <span className="profile__avatar-pencil"></span>
            <img
              className="profile__avatar-image"
              src={userAvatar}
              alt="Изображение профиля"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile-content profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile-content profile__job">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button"  onClick={props.onAddPlace}></button>
      </section>
      <section className="element">
      {cards.map(({_id, ...props}) =>(
        <Card
        key={_id}
        card={props}
        onCardClick={onCardClick}/>
        ))}
      </section>
    </main>
  )
}

export default Main;
