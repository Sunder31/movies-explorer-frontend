import { Link } from "react-router-dom";
import headerLogo from '../../images/header__logo.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";
import { useEffect } from "react";

function Login({ loadingErrorMessage, setLoadingErrorMessage, isLoadingError, setLoadingError, formValues, setFormValues, login, isLoading }) {
    const [validation, handleValidation] = useFormValidation();
    
    const { isValid, isInputValid, errorMessage } = validation;

    const disabledButton = !isValid || isLoading;

    const { email, password } = formValues;

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
            
        login(email, password)
        console.log(email, password)
    }

    return (
        <main>
            <section className="login">
                <div className="login__container">
                    <Link className="login__logo" to='/'>
                        <img src={headerLogo} alt="лого сайта" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form" noValidate onChange={handleValidation} onSubmit={handleSubmit}>
                        <div className="login__input-field">
                            <div className="login__input-container">
                                <label className="login__input-label" htmlFor="email">
                                E-mail
                                </label>
                                <input
                                className={`login__input ${!isInputValid.password ? 'login__input_error' : ''}`}
                                name="email"
                                id="email"
                                placeholder="Введите Email"
                                minLength="2"
                                maxLength="20"
                                value={email}
                                required
                                pattern={EMAIL_REGEX_PATTERN}
                                onChange={handleChange}
                                ></input>
                                <span className="login__error-text">
                                    {errorMessage.email}
                                </span>
                            </div>
                            <div className="login__input-container">
                                <label className="login__input-label" htmlFor="password">
                                Пароль
                                </label>
                                <input
                                type="password"
                                className={`login__input ${!isInputValid.password ? 'login__input_error' : ''}`}
                                name="password"
                                id="password"
                                placeholder="Введите пароль"
                                minLength="2"
                                maxLength="20"
                                value={password}
                                required
                                onChange={handleChange}
                                ></input>
                                <span className="login__error-text">
                                    {errorMessage.password}
                                </span>
                            </div>
                            <span className="login__error-msg">
                                {loadingErrorMessage}
                            </span>
                        </div>
                        <button className={`login__submit-btn ${disabledButton ? 'login__submit-btn_disabled' : ''}`} type="submit" disabled={disabledButton}>
                        Войти
                        </button>
                    </form>
                    <div className="login__register-field">
                        <p className="login__register-field-text">Еще не зарегистрированы?</p>
                        <Link className="login__register-link" to="/signup">
                        Регистрация
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login;