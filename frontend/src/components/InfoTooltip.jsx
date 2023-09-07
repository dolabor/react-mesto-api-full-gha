import React from 'react';

import successfulSignUpImg from '../images/registration-success.svg'
import failedSignUpImg from '../images/registration-fail.svg'
import closeIcon from "../images/Close-icon.svg";

const InfoTooltip = ({isOpen, onClose, isSuccessfulSignUp}) => {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_centered">
        <button className="button popup__close-button"
                type="button"
                aria-label="Закрыть всплывающее окно"
                onClick={onClose}>
          <img className="popup__close-button-image" src={closeIcon} alt="Закрыть"/>
        </button>
        <img
          className="popup__registration-icon"
          src={isSuccessfulSignUp ? successfulSignUpImg : failedSignUpImg}
          alt={isSuccessfulSignUp ? 'Регистрация прошла успешно' : 'Регистрация не завершена'}
        />
        <h2 className="popup__title popup__title_centered">
          {isSuccessfulSignUp ?
            'Вы успешно зарегистрировались!'
            :
            'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </h2>
      </div>
    </section>
  )
}

export default InfoTooltip;
