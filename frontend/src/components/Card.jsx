import React from "react";
import trashDeleteIcon from "../images/Trash.svg";
import likeIcon from "../images/like.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleLikeClick(evt) {
    onCardLike(card);
  }

  function handleDeleteClick(evt) {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img className="element__image"
           id="element__image"
           src={card.link}
           alt={`Фотография ${card.name}`}
           onClick={() => onCardClick({name: card.name, link: card.link})}
      />
      {isOwn &&
        <button className="element__delete-button button" onClick={handleDeleteClick}>
          <img id="trash__delete-icon" src={trashDeleteIcon} alt="Удалить карточку"/>
        </button>}
      <div className="element__caption">
        <h2 className="element__name" id="element__name">{card.name}</h2>
        <div className="element__like-section">
          <button className="button" type="button" aria-label="Мне нравится">
            <img className={cardLikeButtonClassName} src={likeIcon} alt="Нравится" onClick={handleLikeClick}/>
          </button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
