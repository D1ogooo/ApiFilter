import axios from "axios"

const apiPessoas = axios.create({
    baseURL: "https://swapi.py4e.com/api/people"
})

const apiFilms = axios.create({
  baseURL: "https://swapi.py4e.com/api/films"
})

export { apiPessoas, apiFilms}