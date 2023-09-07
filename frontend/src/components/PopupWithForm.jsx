import closeIcon from '../images/Close-icon.svg';
import React from "react";

function PopupWithForm({id, title, titleButton, children, isOpen, onClose, onSubmit, isDisabled}) {

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} id={id}>
      <form className="popup__container" name={id} noValidate onSubmit={onSubmit}>
        <button className="button popup__close-button"
                type="button"
                aria-label="Закрыть всплывающее окно"
                onClick={onClose}>
          <img className="popup__close-button-image" src={closeIcon} alt="Закрыть"/>
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          className={isDisabled ? "popup__submit-button popup__submit-button_inactive button"
            : "popup__submit-button button"}
          type="submit"
          aria-label="Сохранить"
          disabled={isDisabled}>
          {titleButton}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;

