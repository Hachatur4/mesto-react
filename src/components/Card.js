import React from 'react';

function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="card">
      <button type="button" className="card__delete"></button>
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={()=>{handleClick()}}
      />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likeBox">
          <button type="button" className="card__like-button"></button>
          <span className="card__numberLikes">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card