import { HashLink } from 'react-router-hash-link';

function NavTab() {
    return(
        <nav className="nav-tab">
            <div className="nav-tab__links">
                <HashLink className="nav-tab__link" smooth to='/#about-project'>О проекте</HashLink>
                <HashLink className="nav-tab__link" smooth to='/#techs'>Технологии</HashLink>
                <HashLink className="nav-tab__link" smooth to='/#about-me'>Студент</HashLink>
            </div>
        </nav>
    )
}

export default NavTab;