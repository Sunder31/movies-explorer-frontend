import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import headerLogo from '../../images/header__logo.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";

function Register({ loadingErrorMessage, setLoadingErrorMessage, register, isLoading }) {
    const [validation, handleValidation] = useFormValidation();
    
    const { isValid, isInputValid, errorMessage } = validation;

    const disabledButton = !isValid || isLoading;
    
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password} = formValues;

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    useEffect(() => {
        setLoadingErrorMessage('')
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();
            
        register(name, email, password)
    }


    return (
        <main>
            <section className="register">
                <div className="register__container">
                    <Link className="register__logo" to='/'>
                        <img src={headerLogo} alt="лого сайта" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form" noValidate onChange={handleValidation} onSubmit={handleSubmit}>
                        <div className="register__input-field">
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="name">
                                    Имя
                                </label>
                                <input
                                type="text"
                                className={`register__input ${!isInputValid.name ? 'register__input_error' : ''}`}
                                name="name"
                                id="name"
                                placeholder="Введите имя"
                                minLength="2"
                                maxLength="40"
                                required
                                value={name}
                                onChange={handleChange}
                                ></input>
                                <span className="register__error-text">
                                    {errorMessage.name}
                                </span>
                            </div>
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="email">
                                E-mail
                                </label>
                                <input
                                type="text"
                                className={`register__input ${!isInputValid.email ? 'register__input_error' : ''}`}
                                name="email"
                                id="email"
                                placeholder="Введите Email"
                                minLength="2"
                                maxLength="40"
                                required
                                value={email}
                                pattern={EMAIL_REGEX_PATTERN}
                                onChange={handleChange}
                                ></input>
                                <span className="register__error-text">
                                    {errorMessage.email}
                                </span>
                            </div>
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="password">
                                Пароль
                                </label>
                                <input
                                type="password"
                                className={`register__input ${!isInputValid.password ? 'register__input_error' : ''}`}
                                name="password"
                                id="password"
                                placeholder="Введите пароль"
                                minLength="2"
                                maxLength="40"
                                required
                                value={password}
                                onChange={handleChange}
                                ></input>
                                <span className="register__error-text">
                                    {errorMessage.password}
                                </span>
                            </div>
                            <span className="registration__error-msg">
                                {loadingErrorMessage}
                            </span>
                        </div>
                        <button className={`register__submit-btn ${disabledButton ? 'register__submit-btn_disabled' : ''}`} type="submit" disabled={disabledButton}>
                            Зарегистрироваться
                        </button>
                    </form>
                    <div className="register__auth-field">
                        <p className="register__auth-field-text">Уже зарегистрированы?</p>
                        <Link className="register__auth-link" to="/signin">
                            Войти
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Register;