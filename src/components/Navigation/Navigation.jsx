import { Link, useLocation } from "react-router-dom";
import profileIcon from '../../images/profile__icon.svg';
import closeBurger from '../../images/close-burger-menu.svg';

function Navigation({ isBurgerOpen, setBurgerOpen, closeBurgerMenu }) {
    const handleBurgeClose = () => {
        setBurgerOpen(false)
    }

    const location = useLocation();

    return (
        
        <nav className={`navigation ${isBurgerOpen ? 'navigation__active' : ''}`}>
            <button className={`auth-header__close-burger ${isBurgerOpen ? 'auth-header__close-burger_active' : ''}`} type="button" onClick={closeBurgerMenu}>
                <img className="auth-header__button-img" src={closeBurger} alt="кнопка закрытия меню" />
            </button>
            <ul className={`navigation__links ${isBurgerOpen ? 'navigation__links_active' : ''}`}>
                {isBurgerOpen && (
                    <li>
                        <Link className={`navigation__link ${isBurgerOpen ? 'navigation__link_burger' : ''}
                        ${location.pathname === '/' ? 'navigation__link_active' : ''}`} onClick={handleBurgeClose} to='/'>
                            Главная
                        </Link>
                    </li>
                )}
                <li>
                    <Link className={`navigation__link ${isBurgerOpen ? 'navigation__link_burger' : ''}
                        ${location.pathname === '/movies' ? 'navigation__link_active' : ''}`} onClick={handleBurgeClose} to='/movies'>
                            Фильмы
                    </Link>
                </li>
                <li>
                    <Link className={`navigation__link ${isBurgerOpen ? 'navigation__link_burger' : ''}
                        ${location.pathname === '/saved-movies' ? 'navigation__link_active' : ''}`} onClick={handleBurgeClose} to='/saved-movies'>
                            Сохраненные Фильмы
                    </Link>
                </li>
            </ul>
            <Link className='navigation__profile' onClick={handleBurgeClose} to='/profile'>
                Аккаунт
                <div className={`navigation__profile-icon ${isBurgerOpen || location.pathname !== '/' ? 'navigation__profile-icon_active' : ''}`}>
                    <img src={profileIcon} alt="иконка профиля" />
                </div>
            </Link>
        </nav>
    )
}

export default Navigation;