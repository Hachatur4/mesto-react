import React from 'react'
import api from '../utils/api'
import Cards from './Cards.js'

function Main (props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUuserAvatar] = React.useState();

  React.useEffect(() => {
    api.getUserInfo()
    .then((res)=>{
      setUserName(res.name)
      setUserDescription(res.about)
      setUuserAvatar(res.avatar)
    })
    .catch((err)=> console.log(`catch: ${err}`))
  },[userName, userDescription, userAvatar]); 

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then((res)=>{
      const cardsApi = res.map(item => ({
        likes: item.likes.length,
        link: item.link,
        name: item.name,
        id: item._id
      }))
      setCards(cardsApi)
    })
    .catch((err)=> console.log(`catch: ${err}`))
  },[cards]);

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
        {cards.map((card)=>(
          <Cards 
            key={card.id}
            card={card}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;