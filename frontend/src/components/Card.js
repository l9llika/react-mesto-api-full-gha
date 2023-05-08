import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`card__trash-btn ${isOwn ? 'card__trash-btn' : ''}`);

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      {isOwn && <button
        aria-label="deleteButton"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}>
      </button>}
      <img 
      src={card.link} 
      alt={card.name} 
      className="card__image" 
      onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button
            aria-label="likeButton"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick} />
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card
