import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import AuthHeader from "../AuthHeader/AuthHeader";
import * as mainApi from '../../utils/MainApi';
import Footer from "../Footer/Footer";

function SavedMovies({ savedMovies, deleteMovie, checked, setChecked, isFiltered, setFiltered, filteredSavedMovies, setFilteredSavedMovies, setSavedMovies }) {

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        mainApi
            .getMovies()
            .then((res) => {
                setSavedMovies(res.reverse())
                setFiltered(false)
                setChecked(false)
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
            })
    },[])

    const getMovies = () => {
        filterMovies(checked)
    }

    const filterMovies = (checked) => {
        setFiltered(true)
        const filteredMovies = savedMovies.filter((movie) => {
            const searchPhrase = movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputValue.toLowerCase());
        
            return checked ? searchPhrase && movie.duration <= 40 : searchPhrase
        })

        setFilteredSavedMovies(filteredMovies)
    }

    return (
        <>
            <AuthHeader />
            <main className="main">
                <SearchForm 
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    checked={checked}
                    setChecked={setChecked}
                    getMovies={getMovies}
                    filterMovies={filterMovies}
                />
                 <MoviesCardList 
                    movies={isFiltered ? filteredSavedMovies : savedMovies}
                    deleteMovie={deleteMovie}
                    savedMovies={savedMovies}
                 />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;