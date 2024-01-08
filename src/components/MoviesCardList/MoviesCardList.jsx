import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, isLoading, isLoadingErr, isFirstEntrance, handleLikeState, deleteMovie, savedMovies }) {

    const location = useLocation();
    const size = useResize();
    const screenWidth = size[0];

    const [count, setCount] = useState(0)
    const [step, setStep] = useState(0)

    const modifiedMoviesArr = movies.slice(0, count)
    const handleAddMovie = () => {
        setCount(count + step)
    }


    const renderMovies = (moviesArr) => {
        return moviesArr.map((movie) => {
            const isLiked = savedMovies.some(
                (savedMovie) => {
                    savedMovie.id === movie.id
                }
            )

            return (
                <li className="movie" key={movie.id}>
                    <a href={movie.trailerLink} className="movie__trailer">
                        <MoviesCard
                            movie={movie}
                            handleLikeState={handleLikeState}
                            deleteMovie={deleteMovie}
                            isLiked={isLiked}
                        />
                    </a>
                </li>
            )
        })
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            if (screenWidth <= 1090) {
                setCount(8)
                setStep(2)
            } else if (screenWidth <= 620) {
                setCount(5)
                setStep(2)
            } else if (screenWidth >= 1091) {
                setCount(12)
                setStep(3)
            }
        }
    }, [screenWidth])

    return (
        <section className="movies">
            {isLoading ? (
                <Preloader />           
            ) : isLoadingErr ? (
                <p className="movies__text">Ошибка при выполнении запроса</p>
            ) : !isFirstEntrance && movies.length === 0 ? (
                <p className="movies__text">Ничего не найдено</p>
            ) : isFirstEntrance ? (
                <p className="movies__text">Введите название фильма</p>
            ) : (
                <ul className={`movies__list ${location.pathname === '/saved-movies' 
                ? 'movies__list_saved-movies' : ''}`}>
                    {location.pathname === '/movies' ? 
                        renderMovies(modifiedMoviesArr) : renderMovies(movies)
                    }
                </ul>
            )}
            {location.pathname === '/movies' && 
                movies.length > 0 && modifiedMoviesArr.length !== movies.length &&
            (
                <button type='button' className="movies__load-more" onClick={handleAddMovie}>
                    Еще
                </button>
            )}
        </section>
    )
}

export default MoviesCardList;