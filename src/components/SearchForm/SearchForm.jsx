import findMovieBtn from '../../images/find-movie-button.svg';

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__container">
                    <input 
                    type="text" 
                    className="search-form__input"
                    placeholder='Фильм'
                    required
                    />
                    <button type='submit' className="search-form__button">
                        <img src={findMovieBtn} alt="кнопка поиска фильмов" className="search-form__button_img" />
                    </button>
                </div>
                <div className="search-form__checkbox-container">
                    <label className="search-form__checkbox">
                        <input type="checkbox" name='checkbox' className="search-form__checkbox-input" />
                        <span className="search-form__checkbox-changer"></span>
                    </label>
                    <p className="search-form__checkbox-text">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;