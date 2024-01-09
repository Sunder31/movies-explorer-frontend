import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, isLoading, isLoadingError, isFirstEntrance, handleLikeStatus, deleteMovie, savedMovies, count, handleLoadMovie }) {

    const location = useLocation();

    const modifiedMoviesArr = movies.slice(0, count)

    const renderMovies = (moviesArr) => {
        return moviesArr.map((movie) => {
            const isLiked = savedMovies.some((savedMovie) => {
                    savedMovie.id === movie.id
                }
            )

            return (
                <li className="movie" key={movie.id || movie.movieId}>
                    <a href={movie.trailerLink} className="movie__trailer">
                        <MoviesCard
                            movie={movie}
                            handleLikeStatus={handleLikeStatus}
                            deleteMovie={deleteMovie}
                            isLiked={isLiked}
                        />
                    </a>
                </li>
            )
        })
    }

    return (
        <section className="movies">
            {isLoading ? (
                <Preloader />           
            ) : isLoadingError ? (
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
                <button type='button' className="movies__load-more" onClick={handleLoadMovie}>
                    Еще
                </button>
            )}
        </section>
    )
}

export default MoviesCardList;