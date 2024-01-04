import { Link } from "react-router-dom";
import headerLogo from '../../images/header__logo.svg';

function Register() {
    return (
        <main>
            <section className="register">
                <div className="register__container">
                    <Link className="register__logo" to='/'>
                        <img src={headerLogo} alt="лого сайта" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form">
                        <div className="register__input-field">
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="name">
                                    Имя
                                </label>
                                <input
                                type="text"
                                className="register__input"
                                name="name"
                                id="name"
                                placeholder="Введите имя"
                                minLength="2"
                                maxLength="20"
                                required
                                ></input>
                            </div>
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="email">
                                E-mail
                                </label>
                                <input
                                type="text"
                                className="register__input"
                                name="email"
                                id="email"
                                placeholder="Введите Email"
                                minLength="2"
                                maxLength="20"
                                required
                                ></input>
                            </div>
                            <div className="register__input-container">
                                <label className="register__input-label" htmlFor="password">
                                Пароль
                                </label>
                                <input
                                type="password"
                                className="register__input"
                                name="password"
                                id="password"
                                placeholder="Введите пароль"
                                minLength="2"
                                maxLength="20"
                                required
                                ></input>
                            </div>
                        </div>
                        <button className="register__submit-btn" type="submit">
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