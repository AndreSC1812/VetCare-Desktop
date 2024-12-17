import React, { useState, useEffect } from 'react'
import { getProfileRequest } from '../api/auth'
import { uploadProfileImageRequest, updateProfileRequest } from '../api/profile'

function VetProfilePage() {
  const [veterinarian, setVeterinarian] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [newProfileImage, setNewProfileImage] = useState(null)
  const [profileData, setProfileData] = useState({
    fullname: '',
    email: '',
    specialization: '',
    yearsOfExperience: '',
    clinicAddress: '',
    phone: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No estás autenticado')
          return
        }

        const profileData = await getProfileRequest(token)
        setVeterinarian(profileData.user)
        setProfileData({
          fullname: profileData.user.fullname,
          email: profileData.user.email,
          specialization: profileData.user.specialization,
          yearsOfExperience: profileData.user.yearsOfExperience,
          clinicAddress: profileData.user.clinicAddress,
          phone: profileData.user.phone
        })
      } catch (error) {
        setError('No se pudo cargar el perfil. Intenta nuevamente más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleImageChange = (e) => {
    setNewProfileImage(e.target.files[0])
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSaveImage = async () => {
    if (!newProfileImage) {
      setError('Por favor selecciona una imagen.')
      return
    }

    try {
      const response = await uploadProfileImageRequest(newProfileImage)
      setVeterinarian((prevData) => ({
        ...prevData,
        profileImage: response.data.profileImage
      }))
      setIsImageModalOpen(false)
    } catch (error) {
      setError('No se pudo subir la imagen de perfil.')
    }
  }

  const handleSaveProfile = async () => {
    try {
      const response = await updateProfileRequest(profileData)

      // Actualiza el estado de veterinarian con los nuevos datos recibidos del servidor
      setVeterinarian((prevData) => ({
        ...prevData,
        ...profileData // Aquí se asume que el servidor devuelve los datos completos del perfil
      }))

      setIsProfileModalOpen(false) // Cerrar el modal
    } catch (error) {
      setError('No se pudo actualizar los datos del perfil.')
    }
  }

  if (loading) return <p>Cargando perfil...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Perfil del Veterinario</h2>

      <div style={styles.profileContainer}>
        {veterinarian && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <img
                src={veterinarian.profileImage}
                alt="Imagen de perfil"
                style={styles.profileImage}
              />
              <h3>{veterinarian.fullname}</h3>
              <p>{veterinarian.email}</p>
            </div>

            <div style={styles.cardBody}>
              <p>
                <strong>Especialización:</strong> {veterinarian.specialization}
              </p>
              <p>
                <strong>Años de experiencia:</strong> {veterinarian.yearsOfExperience}
              </p>
              <p>
                <strong>Dirección de la clínica:</strong> {veterinarian.clinicAddress}
              </p>
              <p>
                <strong>Teléfono:</strong> {veterinarian.phone}
              </p>
              <p>
                <strong>Horario:</strong> {veterinarian.startTime} - {veterinarian.endTime}
              </p>
            </div>

            <div style={styles.cardFooter}>
              <button onClick={() => setIsImageModalOpen(true)} style={styles.button}>
                Cambiar Foto
              </button>
              <button onClick={() => setIsProfileModalOpen(true)} style={styles.button}>
                Cambiar Datos
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para cambiar la imagen */}
      {isImageModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Cambiar Foto de Perfil</h3>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSaveImage} style={styles.button}>
              Guardar Imagen
            </button>
            <button onClick={() => setIsImageModalOpen(false)} style={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para cambiar los datos del perfil */}
      {isProfileModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Cambiar Datos del Perfil</h3>
            <label>
              Nombre:
              <input
                type="text"
                name="fullname"
                value={profileData.fullname}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label>
              Especialización:
              <input
                type="text"
                name="specialization"
                value={profileData.specialization}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label>
              Años de experiencia:
              <input
                type="number"
                name="yearsOfExperience"
                value={profileData.yearsOfExperience}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label>
              Dirección de la clínica:
              <input
                type="text"
                name="clinicAddress"
                value={profileData.clinicAddress}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>
            <label>
              Teléfono:
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                style={styles.input}
              />
            </label>

            <button onClick={handleSaveProfile} style={styles.button}>
              Guardar Cambios
            </button>
            <button onClick={() => setIsProfileModalOpen(false)} style={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Estilos en línea
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#3bbba4',
    textAlign: 'center'
  },
  profileContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '400px'
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '15px'
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px'
  },
  cardBody: {
    padding: '15px',
    fontSize: '16px'
  },
  cardFooter: {
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3bbba4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
    marginLeft: '10px'
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
    marginLeft: '10px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px'
  }
}

export default VetProfilePage
