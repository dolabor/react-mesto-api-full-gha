import React from 'react';

const FormTemplate = ({formTitle, titleButton, onSubmit}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    onSubmit({email, password})
  }

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h2 className="form__title">{formTitle}</h2>
      <div className="form__inputs">
        <div>
          <label htmlFor="email"></label>
          <input
            className="form__input"
            autoComplete="off"
            id="email"
            name='email'
            placeholder='Email'
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            className="form__input"
            autoComplete="off"
            id="password"
            name='password'
            placeholder='Пароль'
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </div>
      <button
        className="form__submit-button"
        type="submit">
        {titleButton}
      </button>
    </form>
  )
}
export default FormTemplate;
