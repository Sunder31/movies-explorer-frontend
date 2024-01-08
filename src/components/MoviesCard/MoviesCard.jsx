import { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
    const movieLink = movie.poster[Object.keys(movie.poster)]

    const [isLiked, setLike] = useState(false)

    const handleLikeCard = () => {
        setLike(!isLiked);
    }

    const moviesLikeButtonClass = `movie__like-button ${
        isLiked ? 'movie__like-button_active' : ''
    }`

    const location = useLocation()

    return (
        <>
            <img src={movieLink} alt={movie.title} className="movie__image" />
            <div className="movie__container">
                <h3 className="movie__title">{movie.title}</h3>
                {location.pathname === '/movies' ? (
                    <button type='button' onClick={handleLikeCard} className={moviesLikeButtonClass}></button>
                ) : (
                    <button type="button" className="movie__like-button movie__like-button_remove"></button>
                )}
            </div>
            <p className="movie__duration">{movie.duration}</p>
        </>
    )
}

export default MoviesCard;