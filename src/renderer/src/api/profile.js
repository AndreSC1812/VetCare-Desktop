import axios from 'axios'

const API = 'http://localhost:3000'

// Subir la imagen de perfil
export const uploadProfileImageRequest = (profileImage) => {
  const formData = new FormData()
  formData.append('profileImage', profileImage)

  const token = localStorage.getItem('token')
  return axios.post(`${API}/api/profile/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Actualizar datos del perfil
export const updateProfileRequest = (profileData) => {
  const token = localStorage.getItem('token')
  return axios.put(`${API}/api/profile/update`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
