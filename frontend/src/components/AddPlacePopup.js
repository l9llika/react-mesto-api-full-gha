import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isLoading, isOpen, onClose, onOverlayClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    })
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      button={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlayClose}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          type="text"
          name="namePlace"
          value={name}
          onChange={evt => setName(evt.target.value)}
          id="namePlace"
          placeholder="Название"
          className="popup__input popup__input_type_place-name"
          required
          minLength="2"
          maxLength="30" />
        <span id="namePlace-error" className="popup__error" />
      </label>
      <label className="popup__field">
        <input
          type="url"
          name="link"
          value={link}
          onChange={evt => setLink(evt.target.value)}
          id="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_image-source"
          required />
        <span id="link-error" className="popup__error" />
      </label>
    </PopupWithForm>
  )
}
 export default AddPlacePopup;
