import { Link } from "react-router-dom";
import headerLogo from '../../images/header__logo.svg';

function Login() {
    return (
        <main>
            <section className="login">
                <div className="login__container">
                    <Link className="login__logo" to='/'>
                        <img src={headerLogo} alt="лого сайта" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form">
                        <div className="login__input-field">
                            <div className="login__input-container">
                                <label className="login__input-label" htmlFor="email">
                                E-mail
                                </label>
                                <input
                                className="login__input"
                                name="email"
                                id="email"
                                placeholder="Введите Email"
                                minLength="2"
                                maxLength="20"
                                required
                                ></input>
                            </div>
                            <div className="login__input-container">
                                <label className="login__input-label" htmlFor="password">
                                Пароль
                                </label>
                                <input
                                type="password"
                                className="login__input"
                                name="password"
                                id="password"
                                placeholder="Введите пароль"
                                minLength="2"
                                maxLength="20"
                                required
                                ></input>
                            </div>
                        </div>
                        <button className="login__submit-btn" type="submit">
                        Войти
                        </button>
                    </form>
                    <div className="login__register-field">
                        <p className="login__register-field-text">Еще не зарегистрированы?</p>
                        <Link className="login__register-link" to="/signin">
                        Регистрация
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login;