import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <>
            <main className="main">
                <SearchForm />
                 <MoviesCardList />
            </main>
        </>
    )
}

export default SavedMovies;