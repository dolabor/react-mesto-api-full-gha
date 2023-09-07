import React from 'react';

import FormTemplate from "./FormTemplate";

const Login = ({onAuthorization}) => {

  function handleSubmit(data) {
    onAuthorization(data);
  }

  return (
    <section className="login">
      <FormTemplate
        formTitle="Вход"
        titleButton="Войти"
        onSubmit={handleSubmit}>
      </FormTemplate>
    </section>
  )
}

export default Login;
