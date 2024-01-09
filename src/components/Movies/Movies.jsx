import { useState, useEffect, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AuthHeader from '../AuthHeader/AuthHeader';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import Footer from '../Footer/Footer';
import {
    largeMoviesStep,
    maxScreenMoviesCount,
    middleScreenMoviesCount,
    middleScreenWidth,
    minScreenMoviesCount,
    shortsDuration,
    smallMoviesStep,
    smallScreenWidth,
  } from '../../utils/constants';
import useResize from '../../hooks/useResize';

function Movies({ isLoading, setIsLoading, setSavedMovies, savedMovies, isLoadingError, setLoadingError, handleLikeStatus, checked, setChecked }) {
    
    const [filteredMovies, setFilteredMovies] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isFirstEntrance, setFirstEntrance] = useState(true)

    const allMovies = JSON.parse(localStorage.getItem('allMovies'))
    const searchData = JSON.parse(localStorage.getItem('searchData'))
    const [count, setCount] = useState(0)
    const [step, setStep] = useState(0)
    const size = useResize()
    const screenWidth = size[0]
    
    const renderInitialMovies = () => {
        if (screenWidth <= middleScreenWidth) {
            setCount(middleScreenMoviesCount)
            setStep(smallMoviesStep)
        } else if ( screenWidth <= smallScreenWidth) {
            setCount(minScreenMoviesCount)
            setStep(smallMoviesStep)
        } else if (screenWidth > middleScreenWidth) {
            setCount(maxScreenMoviesCount)
            setStep(largeMoviesStep)
        }
    }

    const handleLoadMovie = () => {
        setCount(count + step)
    }

    const filterMovies = useCallback((moviesArr, isChecked, inputText) => {
        setInputValue(inputText)
        setFirstEntrance(false)

        const filteredMovies = moviesArr.filter((movie) => {
            const searchPhrase = movie.nameRU.toLowerCase().includes(inputText.toLowerCase()) || movie.nameEN.toLowerCase().includes(inputText.toLowerCase())
            return isChecked ? searchPhrase && movie.duration <= shortsDuration : searchPhrase
        })

        setFilteredMovies(filteredMovies)
        renderInitialMovies()

        localStorage.setItem('searchData', JSON.stringify({
            movies: filteredMovies,
            checked: isChecked,
            inputValue: inputText
        }))
    }, [screenWidth])

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
                    setLoadingError(false)
                }).catch((err) => {
                    setLoadingError(true)
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
                    isLoadingError={isLoadingError}
                    isFirstEntrance={isFirstEntrance}
                    handleLikeStatus={handleLikeStatus}
                    savedMovies={savedMovies}
                    count={count}
                    handleLoadMovie={handleLoadMovie}
                />
            </main>
            <Footer />
        </>
    )
}

export default Movies;