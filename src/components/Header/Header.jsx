import { Link } from "react-router-dom";
import headerLogo from '../../images/header__logo.svg';

function Header() {
    return(
        <header className="header">
            <Link to="/">
                <img src={headerLogo} alt="логотип" className="header__logo" />
            </Link>
            <nav className="header__nav">
                <Link className="header__link" to="/signup">Регистрация</Link>
                <Link className="header__link" to="/signin">
                    <button className="header__button">Войти</button>
                </Link>
            </nav>
        </header>
    )
}

export default Header;