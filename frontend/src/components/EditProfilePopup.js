import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup({ isOpen, onClose, onOverlayClose, isLoading, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name={'edit'}
      onOverlay={onOverlayClose}
      title={'Редактировать профиль'}
      button={isLoading ? 'Сохранение...' : 'Сохранить'} >
      <label className="popup__field">
        <input
          type="text"
          value={name ? name : ''}
          onChange={handleNameChange}
          name="nameInput"
          id="nameInput"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40" />
        <span id="name-error" className="popup__error" />
      </label>
      <label className="popup__field">
        <input
          type="text"
          value={description ? description : ''}
          onChange={handleDescriptionChange}
          name="jobInput"
          id="jobInput"
          placeholder="О себе"
          className="popup__input popup__input_type_job"
          required
          minLength="2"
          maxLength="200" />
        <span id="job-error" className="popup__error" />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
