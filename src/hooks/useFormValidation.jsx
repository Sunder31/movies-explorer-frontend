import { useState } from 'react';

function useFormValidation() {
  const [isInputValid, setInputValid] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setValid] = useState(false);

  const handleCheckValidation = (evt) => {
    const valid = evt.target.validity.valid;
    const error = evt.target.validationMessage;
    const form = evt.target.form;
    const name = evt.target.name;

    setInputValid((prevState) => ({ ...prevState, [name]: valid }));
    setErrorMessage((prevState) => ({ ...prevState, [name]: error }));
    setValid(form.checkValidity());
  };

  return [
    { isValid, isInputValid, errorMessage },
    handleCheckValidation,
    setErrorMessage,
    setValid,
  ];
}

export default useFormValidation;