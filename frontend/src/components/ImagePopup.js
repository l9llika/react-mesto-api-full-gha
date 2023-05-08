function ImagePopup({ card, onClose, onOverlay }) {
  return (
    <section 
      className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}
      aria-label="popup"
      onClick={onOverlay}>
      <div className="popup__zoom-container">
          <img 
            src={card ? card.link : ''} 
            alt={card ? card.name : ''} 
            className="popup__zoom-image" />
          <p className="popup__zoom-descriprtion">{card ? card.name : ''}</p>
        <button
          aria-label="closeButton"
          type="button"
          className="popup__close-btn"
          onClick={onClose} />
      </div>
    </section>
  )
}

export default ImagePopup





