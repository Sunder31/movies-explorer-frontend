import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";
import {  useState } from "react";
import headerLogo from '../../images/header__logo.svg';
import burgerButton from '../../images/burger-button.svg';

function AuthHeader() {
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    
    const handleBurgerClick = () => {
        setBurgerOpen(!isBurgerOpen)
    }
    
    const location = useLocation();

    return (
        <header className={`auth-header ${ location.pathname === '/' ? 'auth-header_main' : ''}`}>
            <div className="auth-header__container">
                <Link to='/'>
                    <img src={headerLogo} alt="логотип" className="auth-header__logo" />
                </Link>
                <Navigation 
                isBurgerOpen={isBurgerOpen}
                setBurgerOpen={setBurgerOpen}
                closeBurgerMenu={handleBurgerClick}
                />
            </div>
            <button className={`auth-header__burger ${isBurgerOpen ? 'auth-header__burger_active' : ''}`} type="button" onClick={handleBurgerClick}>
                <img className="auth-header__open-burger_button-img" src={burgerButton} alt="кнопка-бургер" />
            </button>
        </header>
    )
}

export default AuthHeader;