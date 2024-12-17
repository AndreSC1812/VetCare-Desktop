// Importamos axios para hacer las peticiones a la API
import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

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

// Función para actualizar un informe
export const updateReportRequest = async (reportId, updatedReportData) => {
  const token = localStorage.getItem('token') // Obtener token

  if (!token) {
    console.error('No token found')
    return
  }

  try {
    const response = await axios.put(
      `${API}/api/reports/${reportId}`, // La ruta para actualizar el informe
      updatedReportData, // Los datos del informe actualizados
      {
        headers: {
          Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
        }
      }
    )

    return response.data.report // Devuelve el informe actualizado
  } catch (error) {
    console.error('Error updating report:', error)
    throw new Error('No se pudo actualizar el informe.')
  }
}

// Función para eliminar un informe
export const deleteReportRequest = async (reportId) => {
  const token = localStorage.getItem('token') // Obtener token

  if (!token) {
    console.error('No token found')
    return
  }

  try {
    await axios.delete(`${API}/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Incluimos el token en el encabezado
      }
    })
  } catch (error) {
    console.error('Error deleting report:', error)
    throw new Error('No se pudo eliminar el informe.')
  }
}
