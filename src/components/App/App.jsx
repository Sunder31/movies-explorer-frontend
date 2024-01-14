import { useState, useEffect } from 'react';
import { Route, Routes , useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';


function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [currentUser, setCurrentUser] = useState({})
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoadingSuccess, setLoadingSuccess] = useState('')
    const [isLoadingError, setLoadingError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isFiltered, setFiltered] = useState(false);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [profileFormValues, setProfileFormValues] = useState({
        'user-name': '',
        'user-email': '',
      });

    const navigate = useNavigate();

    const handleLogin = () => {
        setLoggedIn(true)
    }

    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .checkToken()
                .then((res) => {
                    if (res) {
                        setCurrentUser(res)
                        setLoggedIn(true)
                        setProfileFormValues({
                            'user-name': res.name,
                            'user-email': res.email
                        })
                    }
                }).catch((err) => {
                    console.error(err)
                })
        }
    }, [])

    const login = (email, password) => {
        setIsLoading(true)
        mainApi
            .login(email, password)
            .then((res) => {
                localStorage.setItem('isLoggedIn', true)
                setCurrentUser(res)
                setProfileFormValues({
                    'user-name': res.name,
                    'user-email': res.email
                })
                setFormValues({
                    email: '',
                    password: '',
                })
                handleLogin()
                setLoadingError(false)
                setLoadingErrorMessage('')
                navigate('/movies', { replace: true })
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
                if (err.status === 401) {
                    setLoadingErrorMessage('Неверный логин или пароль')
                } else {
                    setLoadingErrorMessage('Ошибка при выполнении запроса')
                }
                setLoadingError(true);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const register = (name, email, password) => {
        setIsLoading(true)
        mainApi
            .register(name, email, password)
            .then(() => {
                login(email, password)
                setLoadingError(false)
                setLoadingErrorMessage('')
            }).catch((err) => {
                console.error(err)
                setLoadingError(true)
                setLoadingErrorMessage('Ошибка при выполнении запроса')
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const editUserInfo = (name, email) => {
        setIsLoading(true)
        mainApi
            .editUserInfo(name, email)
            .then((res) => {
                setLoadingSuccess(true)
                setCurrentUser(res)
                setLoadingError(false)
                setLoadingErrorMessage('')
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
                setLoadingSuccess(false)
                setLoadingError(true)
                setLoadingErrorMessage('Ошибка при выполнении запроса')
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const deleteMovie = (deleteMovieId) => {
        mainApi
            .deleteMovie(deleteMovieId)
            .then(() => {
                setFilteredSavedMovies(
                    filteredSavedMovies.filter((movie) => movie._id !== deleteMovieId
                    )
                )
                setSavedMovies(
                    savedMovies.filter((movie) => movie._id !== deleteMovieId
                    )
                )
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
            })
    }

    const handleLikeStatus = (movie, isLiked) => {
        if (!isLiked) {
            mainApi
                .saveMovie(movie)
                .then((res) => {
                    setSavedMovies((prevState) => [res, ...prevState])
                }).catch((err) => {
                    console.error(`Error: ${err.status} ${err.statusText}`)
                })
        } else {

            let movieToDelete = null
            savedMovies.forEach((savedMovie) => {
                if (savedMovie.id === movie.id){
                    movieToDelete = savedMovie
                }
            })
            deleteMovie(movieToDelete._id)
        }
    }

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Routes>
                    <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>}></Route>
                    <Route path="/movies" element={
                        <ProtectedRoute element={
                            <Movies
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setSavedMovies={setSavedMovies}
                                savedMovies={savedMovies}
                                isLoadingError={isLoadingError}
                                setLoadingError={setLoadingError}
                                handleLikeStatus={handleLikeStatus}
                                checked={checked}
                                setChecked={setChecked}
                            />}
                            loggedIn={loggedIn}
                        />}
                    />
                    <Route path="/profile" element={
                        <ProtectedRoute element={
                            <Profile
                                setLoggedIn={setLoggedIn}
                                loadingErrorMessage={loadingErrorMessage}
                                setLoadingErrorMessage={setLoadingErrorMessage}
                                setLoadingError={setLoadingError}
                                isLoadingError={isLoadingError}
                                editUserInfo={editUserInfo}
                                isLoading={isLoading}
                                setChecked={setChecked}
                                isLoadingSuccess={isLoadingSuccess}
                                setLoadingSuccess={setLoadingSuccess}
                                formValues={profileFormValues}
                                setFormValues={setProfileFormValues}
                            />}
                            loggedIn={loggedIn}
                        />}
                    />
                    <Route path="/saved-movies" element={
                        <ProtectedRoute element={
                            <SavedMovies
                                savedMovies={savedMovies}
                                deleteMovie={deleteMovie}
                                checked={checked}
                                setChecked={setChecked}
                                isFiltered={isFiltered}
                                setFiltered={setFiltered}
                                filteredSavedMovies={filteredSavedMovies}
                                setFilteredSavedMovies={setFilteredSavedMovies}
                                setSavedMovies={setSavedMovies}
                            />}
                            loggedIn={loggedIn}
                        />}
                    />
                    <Route path="/*" element={<NotFoundPage />}></Route>
                    <Route path="/signin" element={<Login 
                        loadingErrorMessage={loadingErrorMessage}
                        setLoadingErrorMessage={setLoadingErrorMessage}
                        isLoadingError={isLoadingError}
                        setLoadingError={setLoadingError}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        login={login}
                        isLoading={isLoading}
                    />}
                        loggedIn={!loggedIn}
                    />
                    <Route path="/signup" element={<Register
                        loadingErrorMessage={loadingErrorMessage}
                        setLoadingErrorMessage={setLoadingErrorMessage}
                        setLoadingError={setLoadingError}
                        isLoadingError={isLoadingError}
                        register={register}
                        isLoading={isLoading}
                    />}
                        loggedIn={!loggedIn}
                    />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
