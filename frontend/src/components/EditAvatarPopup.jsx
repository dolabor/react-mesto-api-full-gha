import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormValidation from "../hooks/useFormValidation";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const {values, errors, setValues, isValid, handleChange} = useFormValidation({});
  const inputEditAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar: inputEditAvatar.current.value});
  }

   React.useEffect(() => {
    if (!isOpen) {
      setValues({
        'avatar-ref': '',
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      id="popup-change-avatar"
      title="Обновить аватар"
      titleButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}>
      <input
        id="avatar-ref"
        className={errors['avatar-ref'] ? "popup__input popup__input-error_active" : "popup__input"}
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar-ref"
        value={values['avatar-ref'] || ''}
        onChange={handleChange}
        ref={inputEditAvatar}
        required
      />
      <span className={errors['avatar-ref'] ? "popup__input-error popup__input-error_active" : "popup__input-error"}>
        {errors['avatar-ref']}
      </span>
      <label htmlFor="avatar-ref"/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
