import React, { useContext } from "react"
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
        <section className="profile">
          <div className="profile__info">
            <div className="profile__image-container" onClick={onEditAvatar}>
              <img 
                src={currentUser ? currentUser.avatar : ''} 
                alt="Фото профиля" 
                className="profile__avatar" />
              <button 
                type="button" 
                onClick={onEditAvatar}
                className="profile__edit-btn-avatar"></button>
            </div>

            <div className="profile__description">
              <div className="profile__description-wrapper">
                <h1 className="profile__name">{currentUser ? currentUser.name : ''}</h1>
                <button 
                  className="profile__edit-btn"  
                  aria-label="edit-button" 
                  type="button" 
                  onClick={onEditProfile}></button>
              </div>
              <p className="profile__about">{currentUser ? currentUser.about : ''}</p>
            </div>
          </div>
          <button 
            className="profile__add-btn"  
            aria-label="add-button" 
            type="button" 
            onClick={onAddPlace}></button>
        </section>
        {/* <!-- ./profile --> */ }
        <section className="cards" aria-label="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </section>
        {/* ./cards */}
      </main>
  )
}

export default Main