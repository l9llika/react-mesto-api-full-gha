function PopupWithForm(props) {
  return(
      <div 
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} 
      onClick={props.onOverlay}
      aria-label="popup">
        <div className="popup__container">
            <div className="popup__content">
              <h2 className="popup__title">{props.title}</h2>
              <form 
                onSubmit={props.onSubmit}
                name={`${props.name}-form`} 
                className={`popup__form popup__form_type_${props.name}`}>
              {props.children}
              <button
                aria-label="saveButton"
                type="submit"
                className="popup__save-btn">{props.button}</button>
              </form>
            </div>
           <button 
            aria-label="closeButton"
            type="button"
            className="popup__close-btn"
            onClick={props.onClose} />
        </div>
      </div>      
  )
}

export default PopupWithForm;