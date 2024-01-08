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
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [currentUser, setCurrentUser] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoadingErr, setLoadingErr] = useState(false);
    const [loadingErrMessage, setLoadingErrMessage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isFilteredSavedMovies, setFilteredSavedMovies] = useState([]);
    
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoggedIn(true);
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn) {
            mainApi
                .checkToken()
                .then((res) => {
                    if (res) {
                        setCurrentUser(res)
                        setLoggedIn(true)
                        navigate('/movies', { replace: true })
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
                localStorage.getItem('isLoggedIn', true)
                setCurrentUser(res)

                setFormValues({
                    email: '',
                    password: '',
                })
                handleLogin()
                setLoadingErr(false)
                setLoadingErrMessage('')
                navigate('/movies', { replace: true })
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
                if (err.status === 401) {
                    setLoadingErrMessage('Неверный логин или пароль')
                }
                setLoadingErr(true);
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
                setLoadingErr(false)
                setLoadingErrMessage('')
            }).catch((err) => {
                console.error(err)
                setLoadingErrMessage('Ошибка при выполнении запроса')
                setLoadingErr(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const editUserInfo = (name, email) => {
        setIsLoading(true)
        mainApi
            .editUserInfo(name, email)
            .then((res) => {
                setCurrentUser(res)
                setLoadingErr(false)
                setLoadingErrMessage('')
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
                setLoadingErrMessage('Ошибка при выполнении щзапроса')
                setLoadingErr(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const deleteMovie = (movieId) => {
        mainApi
            .deleteMovie(movieId)
            .then(() => {
                setFilteredSavedMovies(
                    isFilteredSavedMovies.filter((movie) => {
                        movie._id !== movieId
                    })
                )
                setSavedMovies(
                    savedMovies.filter((movie) => {
                        movie._id !== movieId
                    })
                )
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
            })
    }

    const handleLikeState = (movie, isLiked) => {
        if (!isLiked) {
            mainApi
                .saveMovie(movie)
                .then((res) => {
                    setSavedMovies((prevState) => [res, ...prevState])
                }).catch((err) => {
                    console.error(`Error: ${err.status} ${err.statusText}`)
                })
        } else {
            const currentMovie = savedMovies.filter(
                (savedMovie) => {
                    savedMovie.id === movie.id
                }
            )
            deleteMovie(currentMovie[0]._id)
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
                                savedMovies={savedMovies}
                                setSavedMovies={setSavedMovies}
                                isLoadingErr={isLoadingErr}
                                setLoadingErr={setLoadingErr}
                                handleLikeState={handleLikeState}
                                checked={checked}
                                setChecked={setChecked}
                            />}
                        />}
                    />
                    <Route path="/profile" element={
                        <ProtectedRoute element={
                            <Profile
                                setLoggedIn={setLoggedIn}
                                loadingErrMessage={loadingErrMessage}
                                setLoadingErrMessage={setLoadingErrMessage}
                                setLoadingErr={setLoadingErr}
                                isLoadingErr={isLoadingErr}
                                editUserInfo={editUserInfo}
                                isLoading={isLoading}
                            />}
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
                                setIsFiltered={setIsFiltered}
                                isFilteredSavedMovies={isFilteredSavedMovies}
                                setFilteredSavedMovies={setFilteredSavedMovies}
                                setSavedMovies={setSavedMovies}
                            />}
                        />}
                    />
                    <Route path="/*" element={<NotFoundPage />}></Route>
                    <Route path="/signin" element={<Login 
                        loadingErrMessage={loadingErrMessage}
                        setLoadingErrMessage={setLoadingErrMessage}
                        isLoadingErr={isLoadingErr}
                        setLoadingErr={setLoadingErr}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        login={login}
                        isLoading={isLoading}
                    />}></Route>
                    <Route path="/signup" element={<Register
                        register={register}
                        isLoading={isLoading}
                    />}></Route>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
