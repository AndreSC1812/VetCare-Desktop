import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

// Función para obtener todos los clientes
export const getClientsRequest = () => axios.get(`${API}/api/clients`)

// Función para obtener los detalles de un cliente por su ID
export const getClientByIdRequest = (clientId) => axios.get(`${API}/api/clients/${clientId}`)
