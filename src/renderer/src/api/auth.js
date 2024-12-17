//importamos axios para hacer las peticiones a la API
import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

// Función para hacer la petición de registro
export const registerRequest = (veterinarian) =>
  axios.post(`${API}/api/auth/register`, veterinarian)

// Función para hacer la petición de login
export const loginRequest = (veterinarian) => axios.post(`${API}/api/auth/login`, veterinarian)

// Función para hacer la petición del perfil
export const getProfileRequest = async (token) => {
  try {
    const response = await axios.get(`${API}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data // Regresa los datos del perfil
  } catch (error) {
    throw new Error('Error al obtener los datos del perfil')
  }
}
