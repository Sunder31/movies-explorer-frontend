import { baseUrl } from './constants';

export const getResData = (res) => {
    if (res.ok) {
        return res.json()
    } 
        return Promise.reject(`Error: ${res.status}`)
}

export const register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
    }).then((res) => {
        return getResData(res)
    })
}

export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then((res) => {
        return getResData(res)
    })
}

export const checkToken = () => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        return getResData(res)
    })
}

export const logout = () => {
    return fetch(`${baseUrl}/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return getResData(res);
    })
}

export const saveMovie = (movie) => {
    return fetch(`${baseUrl}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            trailerLink: movie.trailerLink,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN
        })
    }).then((res) => {
        return getResData(res)
    })
}

export const deleteMovie = (movieId) => {
    return fetch(`${baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
        return getResData(res)
    })
}

export const getMovies = () => {
    return fetch(`${baseUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then((res) => {
        return getResData(res);
    })
}

export const editUserInfo = (name, email) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    }).then((res) => {
        return getResData(res);
    })
}
