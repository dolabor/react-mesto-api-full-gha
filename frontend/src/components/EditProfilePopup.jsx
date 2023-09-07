import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormValidation from "../hooks/useFormValidation";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, setValues, errors, isValid, handleChange} = useFormValidation({});

  React.useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        ...values,
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      id="edit-profile-form"
      title="Редактировать профиль"
      titleButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}>
      <input
        id="name"
        className={errors.name ? "popup__input popup__input-error_active" : "popup__input"}
        type="text"
        placeholder="Имя"
        name="name"
        value={values.name || ''}
        minLength={2}
        maxLength={30}
        required
        onChange={handleChange}
      />
      <span className={errors.name ? "popup__input-error popup__input-error_active" : "popup__input-error"}>
        {errors.name}
      </span>
      <label htmlFor="name"/>
      <input
        id="occupation"
        className={errors.about ? "popup__input popup__input-error_active" : "popup__input popup__occupation"}
        type="text"
        placeholder="О себе"
        name="about"
        value={values.about || ''}
        minLength={2}
        maxLength={200}
        required
        onChange={handleChange}
      />
      <span className={errors.about ? "popup__input-error popup__input-error_active" : "popup__input-error"}>
        {errors.about}
      </span>
      <label htmlFor="occupation"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
