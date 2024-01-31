import { useLocation } from "react-router-dom";

function MoviesCard({ movie, handleLikeStatus, deleteMovie, isLiked }) {

    const movieImage = `https://api.nomoreparties.co/${movie.image.url}`;
    const convertTime = (num) => {
        const hours = num / 60
        const roundHours = Math.floor(hours)
        const minutes = Math.floor((hours - roundHours) * 60)

        return roundHours === 0 ? `${minutes}м` : minutes === 0 ? `${roundHours}ч` : `${roundHours}ч ${minutes}м`
    }

    const handleLikeCard = (evt) => {
        evt.preventDefault()
        
        handleLikeStatus(movie, isLiked)
    }

    const handleDeleteCard = (evt) => {
        evt.preventDefault()

        isLiked = false
        deleteMovie(movie._id)
    }

    const moviesLikeButtonClass = `movie__like-button ${
        isLiked ? 'movie__like-button_active' : ''
    }`

    const location = useLocation()

    return (
        <>
            <img src={location.pathname === '/movies' ? movieImage : movie.image} alt={movie.image.name} className="movie__image" />
            <div className="movie__container">
                <h3 className="movie__title">{movie.nameRU}</h3>
                {location.pathname === '/movies' ? (
                    <button type='button' onClick={handleLikeCard} className={moviesLikeButtonClass}></button>
                ) : (
                    <button type="button" className="movie__like-button movie__like-button_remove" onClick={handleDeleteCard}></button>
                )}
            </div>
            <p className="movie__duration">{convertTime(movie.duration)}</p>
        </>
    )
}

export default MoviesCard;