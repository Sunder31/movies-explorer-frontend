import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import AuthHeader from "../AuthHeader/AuthHeader";

function SavedMovies() {
    return (
        <>
            <AuthHeader />
            <main className="main">
                <SearchForm />
                 <MoviesCardList />
            </main>
        </>
    )
}

export default SavedMovies;