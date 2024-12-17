// Importamos axios para hacer las peticiones a la API
import axios from 'axios'

const API = 'https://vetcare-backend-bm97.onrender.com'

// Función para enviar una notificación por correo
export const sendNotificationRequest = (notificationData) =>
  axios.post(`${API}/api/email/sendNotification`, notificationData)
