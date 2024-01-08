import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AuthHeader from '../AuthHeader/AuthHeader';

function Movies() {
    return (
        <>
            <AuthHeader />
            <main className='main'>
                <SearchForm />
                <MoviesCardList />
            </main>
        </>
    )
}

export default Movies;