import React from 'react';

import {Link} from 'react-router-dom';
import FormTemplate from "./FormTemplate";

const Register = ({onRegistration}) => {

  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(data) {
    onRegistration(data);
  }

  return (
    <section className="register">
      <FormTemplate
        formTitle="Регистрация"
        titleButton="Зарегистрироваться"
        onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </FormTemplate>
      <p className="register__redirect-link">
        Уже зарегистрированы?{" "}
        <Link className="register__redirect-link" to="/signin">Войти</Link>
      </p>
    </section>
  )
}

export default Register;
