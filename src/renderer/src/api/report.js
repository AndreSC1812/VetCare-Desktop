// Importamos axios para hacer las peticiones a la API
import axios from 'axios'

// Definimos la URL base de la API
const API = 'http://localhost:3000'

// Función para crear un informe
export const createReportRequest = (report) => {
  const token = localStorage.getItem('token') // Obtenemos el token del localStorage

  return axios.post(`${API}/api/reports`, report, {
    headers: {
      Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
    }
  })
}

// Función para obtener los informes creados por un veterinario
export const getReportsByVeterinarianRequest = async () => {
  const token = localStorage.getItem('token') // Obtenemos el token del localStorage

  if (!token) {
    console.error('No token found')
    return
  }

  try {
    const response = await axios.get(`${API}/api/reports/veterinarian`, {
      headers: {
        Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
      }
    })

    return response.data.reports // Devuelve la lista de informes
  } catch (error) {
    console.error('Error fetching reports:', error)
    throw new Error('No se pudieron obtener los informes.')
  }
}

// Función para obtener un informe por su ID
export const getReportByIdRequest = async (reportId) => {
  const token = localStorage.getItem('token') // Obtenemos el token del localStorage

  if (!token) {
    console.error('No token found')
    return
  }

  try {
    const response = await axios.get(`${API}/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
      }
    })

    return response.data.report // Devuelve el informe solicitado
  } catch (error) {
    console.error('Error fetching report by ID:', error)
    throw new Error('No se pudo obtener el informe.')
  }
}
