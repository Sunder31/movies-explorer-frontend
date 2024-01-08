import { useState, useEffect, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AuthHeader from '../AuthHeader/AuthHeader';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import Footer from '../Footer/Footer';

function Movies({ isLoading, setIsLoading, savedMovies, setSavedMovies, isLoadingErr, setLoadingErr, handleLikeState, checked, setChecked }) {
    
    const [filteredMovies, setFilteredMovies] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isFirstEntrance, setFirstEntrance] = useState(true)

    const allMovies = JSON.parse(localStorage.getItem('allMovies'))
    const searchData = JSON.parse(localStorage.getItem('searchData'))
    
    const filterMovies = useCallback((moviesArr, isChecked, inputText) => {
        setInputValue(inputText)
        setFirstEntrance(false)

        const filteredMovies = moviesArr.filter((movie) => {
            const keyword = movie.nameRU.toLowerCase().includes(inputText.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputText.toLowerCase())
        
            return isChecked ? keyword && movie.duration <= 40 : keyword
        })

        setFilteredMovies(filteredMovies)

        localStorage.setItem('searchData', 
            JSON.stringify({
                movies: filteredMovies,
                checked: isChecked,
                inputValue: inputText
            }))
    }, [])
    
    useEffect(() => {
        if (searchData) {
            const { movies, checked, inputValue } = searchData

            setInputValue(inputValue)
            setChecked(checked)
            setFilteredMovies(movies)
            filterMovies(movies, checked, inputValue)
        }
    }, [filterMovies])
    
    useEffect(() => {
        mainApi
            .getMovies()
            .then((res) => {
                setSavedMovies(res.reverse())
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
            })
    }, [])
    
    const getMovies = () => {
        if (!allMovies) {
            setIsLoading(true)
            moviesApi
                .getMovies()
                .then((res) => {
                    res.map((movie) => {
                        movie.isLiked = false
                        return movie
                    })
                    localStorage.setItem('allMovies', JSON.stringify(res))
                    filterMovies(res, checked, inputValue)
                    setLoadingErr(false)
                }).catch((err) => {
                    setLoadingErr(true)
                    console.error(`${err} ${err.message}`)
                }).finally(() => {
                    setIsLoading(false)
                })
        } else {
            filterMovies(allMovies, checked, inputValue)
        }
    }
    
    return (
        <>
            <AuthHeader />
            <main className='main'>
                <SearchForm 
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    getMovies={getMovies}
                    filterMovies={filterMovies}
                    allMovies={allMovies}
                    checked={checked}
                    setChecked={setChecked}
                    isFirstEntrance={isFirstEntrance}
                />
                <MoviesCardList
                    movies={filteredMovies}
                    isLoading={isLoading}
                    isLoadingErr={isLoadingErr}
                    isFirstEntrance={isFirstEntrance}
                    handleLikeState={handleLikeState}
                    savedMovies={savedMovies}
                />
            </main>
            <Footer />
        </>
    )
}

export default Movies;