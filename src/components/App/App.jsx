import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import AuthHeader from '../AuthHeader/AuthHeader';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return(
        <div className='page'>
            {isLoggedIn ? <Header /> : <AuthHeader />}
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/saved-movies" element={<SavedMovies />}></Route>
                <Route path="/*" element={<NotFoundPage />}></Route>
                <Route path="/signin" element={<Login />}></Route>
                <Route path="/signup" element={<Register />}></Route>
            </Routes>
            <Footer />
        </div>
    )
}

export default App;