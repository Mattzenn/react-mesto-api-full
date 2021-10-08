export const BASE_URL = 'http://localhost:3001'
const jwt = localStorage.getItem('token')

const handleResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email })
    })
        .then(handleResponse)
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email })
    })
        .then(handleResponse)
        .then(data => localStorage.setItem('jwt', data.token))
}

export const getContent = (token) => {
    console.log(`токен для проверки ${token}`)
    return fetch(`${BASE_URL}/users/`, {
        method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(handleResponse)
}