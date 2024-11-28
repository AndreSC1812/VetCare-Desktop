import axios from 'axios'

// Definimos la URL base de la API
const API = 'http://localhost:3000'

// Función para obtener todos los clientes
export const getClientsRequest = () => axios.get(`${API}/api/clients`)

// Función para obtener los detalles de un cliente por su ID
export const getClientByIdRequest = (clientId) => axios.get(`${API}/api/clients/${clientId}`)
