import PopupWithForm from './PopupWithForm';
import React from 'react';
import useFormValidation from '../hooks/useFormValidation';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const {values, setValues, errors, isValid, handleChange} = useFormValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  React.useEffect(() => {
    if (!isOpen) {
      setValues({
        title: '',
        'image-ref': '',
      });
    }
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      id='add-place-form'
      title='Новое место'
      titleButton='Cоздать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}>
      <input
        id='title'
        className={errors.title ? 'popup__input popup__input-error_active' : 'popup__input'}
        type='text'
        minLength={2}
        maxLength={30}
        placeholder='Название'
        name='title'
        onChange={handleChange}
        value={values.title || ''}
        required
      />
      <span className={errors.title ? 'popup__input-error popup__input-error_active' : 'popup__input-error'}>
        {errors.title}
      </span>
      <label htmlFor='title'/>
      <input
        id='image-ref'
        className={errors['image-ref'] ? 'popup__input popup__input-error_active' : 'popup__input popup__occupation'}
        type='url'
        placeholder='Ссылка на картинку'
        name='image-ref'
        onChange={handleChange}
        value={values['image-ref'] || ''}
        required
      />
      <span className={errors['image-ref'] ? 'popup__input-error popup__input-error_active' : 'popup__input-error'}>
        {errors['image-ref']}
      </span>
      <label htmlFor='image-ref'/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
