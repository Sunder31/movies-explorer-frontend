import { moviesUrl } from './constants';

const getResData = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Error: ${res.status}`)
    }
}

export const getMovies = () => {
    return fetch(`${moviesUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then((res) => {
        return getResData(res);
    })
}
