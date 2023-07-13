import React from 'react';

function PopupImage(props) {
  
  function handlePopupOpen () {
    return 'popup_opened'
  }

  return (
    <div className= {`popup popup-image ${props.card && handlePopupOpen()}`} onClick={()=>{props.onClose()}}>
    <div className="popup__container-image" onClick={e=> e.stopPropagation()}>
      <img
        className="popup__element-image"
        src={props.card.link}
        alt={props.card.name}
      />
      <p className="popup__title-image">{props.card.name}</p>
      <button type="button" className="popup__close-icon" onClick={()=>{props.onClose()}}></button>
    </div>
  </div>
  );
} 

export default PopupImage