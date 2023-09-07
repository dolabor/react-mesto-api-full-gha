import React from "react";

export default function useFormValidation({name, about}) {
  const [values, setValues] = React.useState({name, about});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const form = evt.target.form;

    setValues((previousValues) => {
      return {
        ...previousValues,
        [name]: value
      }
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: validationMessage
      }
    });

    setIsValid(form.checkValidity());
  };

  return (
    { values, setValues, errors, isValid, handleChange }
  )
}
