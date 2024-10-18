//importamos axios para hacer las peticiones a la API
import axios from 'axios'

// Definimos la URL base de la API
const API = 'http://localhost:3000'

// Función para hacer la petición de registro
export const registerRequest = (veterinarian) =>
  axios.post(`${API}/api/auth/register`, veterinarian)

// Función para hacer la petición de login
export const loginRequest = (veterinarian) => axios.post(`${API}/api/auth/login`, veterinarian)
