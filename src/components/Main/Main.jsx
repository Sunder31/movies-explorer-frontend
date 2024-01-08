import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import AuthHeader from '../AuthHeader/AuthHeader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main({ isLoggedIn }) {
    return(
        <>
        {isLoggedIn ? <Header /> : <AuthHeader />}
            <main className="main">
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
            </main>
            <Footer />
        </>
    )
}

export default Main;