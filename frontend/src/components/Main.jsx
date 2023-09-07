import editButtonLarge from "../images/edit-button-large.svg";
import addButtonLarge from "../images/add-button-large.svg";
import Card from "./Card.jsx";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img
              className="profile__avatar-image"
              src={currentUser.avatar}
              alt={`Аватар пользователя ${currentUser.name}`}
            />
          </div>
          <div className="profile__heading">
            <div className="profile__username">
              <h1 className="profile__title" id="user__name">{currentUser.name}</h1>
              <button className="button profile__edit-button"
                      type="button"
                      aria-label="Редактировать профиль"
                      onClick={onEditProfile}>
                <img className="profile__edit-icon" src={editButtonLarge} alt="Кнопка редактирования"/>
              </button>
            </div>
            <p id="user__occupation" className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>

        <button className="button" type="button" aria-label="Добавить" onClick={onAddPlace}>
          <img className="profile__add-button" src={addButtonLarge} alt="Кнопка 'Добавить'"/>
        </button>
      </section>
      <section className="destinations" aria-label="Пункты назначения">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main;
