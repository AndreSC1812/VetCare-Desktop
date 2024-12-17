import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

// Función para obtener las mascotas de un cliente por su ID
export const getPetsByClientRequest = (clientId) => axios.get(`${API}/api/pets/${clientId}`)
