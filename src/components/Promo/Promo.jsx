import promoLogo from '../../images/promo__logo.svg';

function Promo() {
    return(
        <section className='promo'>
            <img src={promoLogo} alt="лого практикума" className="promo__logo" />
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </section>
    )
}

export default Promo;