import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';

function InfoTooltip({ onClose, isOpen, isRequestStatus }) {
  return (
    <section className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          aria-label="closeButton"
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        />
        <div className="popup__info-status">
          <img
            className="popup__info-image"
            src={isRequestStatus ? success : unsuccess}
            alt={isRequestStatus ? 'Успешно' : 'Попробуйте еще раз'}
          />
          <h2 className="popup__title popup__title-status">
            {isRequestStatus
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h2>
        </div>
      </div>

    </section>
  )
}

export default InfoTooltip;