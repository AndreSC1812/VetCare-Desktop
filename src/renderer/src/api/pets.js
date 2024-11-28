import axios from 'axios'

// Definimos la URL base de la API
const API = 'http://localhost:3000'

// Función para obtener las mascotas de un cliente por su ID
export const getPetsByClientRequest = (clientId) => axios.get(`${API}/api/pets/${clientId}`)
