import testMovie from '../../images/test_movie.jpg';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
    const movies = [
        {
            _di: 1,
            title: 'test 1',
            duration: '1ч 11м',
            poster: {testMovie}
        },
        {
            _di: 2,
            title: 'test 2',
            duration: '1ч 11м',
            poster: {testMovie}
        },
        {
            _di: 3,
            title: 'test 3',
            duration: '1ч 11м',
            poster: {testMovie}
        },
        {
            _di: 4,
            title: 'test 4',
            duration: '1ч 11м',
            poster: {testMovie}
        },
    ]

    const location = useLocation();

    const moviesList = movies.map((movie) => {
        return (
            <li className="movie" key={movie._id}>
                <MoviesCard movie={movie}/>
            </li>
        )
    })

    return (
        <section className="movies">
            <ul className={`movies__list ${location.pathname === '/saved-movies' 
            ? 'movies__list_saved-movies' : ''}`}>
                {moviesList}
            </ul>
            {location.pathname === '/movies' && (
                <button type='button' className="movies__load-more">
                    Еще
                </button>
            )}
        </section>
    )
}

export default MoviesCardList;