import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

// Obtener las citas de un veterinario
export const getAppointmentsByVeterinarianRequest = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${API}/api/appointments/veterinarian`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Cambiar el estado de una cita
export const changeAppointmentStatusRequest = (idAppointment, status) => {
  const token = localStorage.getItem('token')
  return axios.put(
    `${API}/api/appointments/${idAppointment}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
