// Importamos axios para hacer las peticiones a la API
import axios from 'axios'

// Definimos la URL base de la API
const API = 'http://localhost:3000'

// Función para enviar una notificación por correo
export const sendNotificationRequest = (notificationData) =>
  axios.post(`${API}/api/email/sendNotification`, notificationData)
