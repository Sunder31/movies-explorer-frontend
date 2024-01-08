import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import findMovieBtn from '../../images/find-movie-button.svg';


function SearchForm({ inputValue, setInputValue, getMovies, filterMovies, allMovies, checked, setChecked, isFirstEntrance }) {

    const [isValid, setValid] = useState(true)

    const location = useLocation()

    const handleFormSubmit = (evt) => {
        evt.preventDefault()

        if (inputValue) {
            setValid(true)
            getMovies()
        } else {
            setValid(false)
        }
    }

    const handleChangeInputValue = (evt) => {
        setInputValue(evt.target.value)
    }

    const handleCheckBoxState = () => {
        if (inputValue) {
            setChecked(!checked)
            setValid(true)
            location.pathname === '/movies' ? filterMovies(allMovies, !checked, inputValue) : filterMovies(!checked)
        } else {
            setValid(false)
        }
    }

    return (
        <section className="search-form">
            <form className="search-form__form" noValidate onSubmit={handleFormSubmit}>
                <div className="search-form__container">
                    <input 
                    type="text" 
                    className="search-form__input"
                    placeholder='Фильм'
                    name='film'
                    required
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    />
                    <button type='submit' className="search-form__button">
                        <img src={findMovieBtn} alt="кнопка поиска фильмов" className="search-form__button_img" />
                    </button>
                </div>
                {!isValid && (
                <span className={`search-form__error ${!isValid ? 'search-form__error_visible' : ''}`}>
                    Введите запрос
                </span>)}
                <div className="search-form__checkbox-container">
                    <label className="search-form__checkbox">
                        <input type="checkbox" name='checkbox' className="search-form__checkbox-input" disabled={isFirstEntrance} checked={checked} onChange={handleCheckBoxState}/>
                        <span className="search-form__checkbox-changer"></span>
                    </label>
                    <p className="search-form__checkbox-text">Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;