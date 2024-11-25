import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadProfileImageRequest, updateProfileRequest } from '../api/profile'

function InitialSetupPage() {
  const [specialization, setSpecialization] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [clinicAddress, setClinicAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Manejador para mostrar la vista previa de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProfileImage(file)
    if (file) {
      // Validamos que sea una imagen
      if (file.type.startsWith('image/')) {
        setPreviewImage(URL.createObjectURL(file))
        setError('') // Limpiamos el error si la imagen es válida
      } else {
        setError('Por favor, selecciona una imagen válida')
        setPreviewImage(null)
      }
    } else {
      setPreviewImage(null)
    }
  }

  // Manejador de subida de imagen de perfil
  const handleImageUpload = async (e) => {
    e.preventDefault()
    if (!profileImage) {
      setError('Por favor, selecciona una imagen')
      return
    }

    try {
      setLoading(true)
      await uploadProfileImageRequest(profileImage)
    } catch (error) {
      setError('Error al subir la imagen, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Manejador para la actualización del perfil
  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    const profileData = { specialization, yearsOfExperience, clinicAddress, phone }

    try {
      setLoading(true)
      await updateProfileRequest(profileData)
      navigate('/dashboard')
    } catch (error) {
      setError('Error al actualizar los datos del perfil, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Estilos en línea
  const styles = {
    body: {
      margin: 0, // Elimina cualquier margen por defecto del body
      padding: 0, // Elimina el padding por defecto
      fontFamily: 'Arial, sans-serif', // Puedes cambiar la fuente si lo deseas
      height: '100%', // Asegura que el body ocupe toda la altura de la ventana
      boxSizing: 'border-box' // Para que el padding y borde no afecten el tamaño
    },
    html: {
      height: '100%', // Asegura que el HTML ocupe toda la altura
      margin: 0, // Elimina margen por defecto
      padding: 0 // Elimina padding por defecto
    },
    container: {
      margin: 0, // Elimina márgenes del contenedor principal
      padding: 0, // Elimina padding
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // Asegura que el contenedor ocupe toda la altura visible
      backgroundColor: '#3bbba4' // Fondo verde claro
    },
    card: {
      backgroundColor: '#fff', // Fondo blanco para la card
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      width: '100%',
      marginBottom: '0' // Elimina cualquier margen debajo de la tarjeta
    },
    imageContainer: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginBottom: '15px',
      backgroundColor: '#f0f0f0', // Fondo gris si no hay imagen
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imagePreview: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginBottom: '15px'
    },
    formControl: {
      marginTop: '1rem'
    },
    inputField: {
      width: '100%',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      marginTop: '1rem',
      padding: '0.75rem 1.25rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '100%' // Esto hace que los botones se estiren a lo largo del formulario
    },
    secondaryButton: {
      backgroundColor: '#3bbba4', // Botón color verde claro
      color: '#fff',
      marginBottom: '1rem' // Agregado margen inferior para separar los botones
    },
    primaryButton: {
      backgroundColor: '#3bbba4', // Botón color verde claro
      color: '#fff'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '0.75rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center'
    }
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 className="text-center mb-4">Completa tu Perfil</h2>

          {/* Mostrar el error si lo hay */}
          {error && <div style={styles.errorMessage}>{error}</div>}

          <div className="text-center mb-4">
            {/* Imagen de perfil redondeada */}
            {previewImage ? (
              <img src={previewImage} alt="Vista previa de perfil" style={styles.imagePreview} />
            ) : (
              <div style={styles.imageContainer} />
            )}
            <div className="mt-3">
              <input
                type="file"
                className="form-control"
                accept="image/*" // Solo permite seleccionar imágenes
                onChange={handleImageChange}
              />
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="form-group" style={styles.formControl}>
              <label>Especialización</label>
              <input
                type="text"
                style={styles.inputField}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={styles.formControl}>
              <label>Años de Experiencia</label>
              <input
                type="number"
                style={styles.inputField}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>
            <div className="form-group" style={styles.formControl}>
              <label>Dirección de la Clínica</label>
              <input
                type="text"
                style={styles.inputField}
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
              />
            </div>
            <div className="form-group" style={styles.formControl}>
              <label>Teléfono</label>
              <input
                type="text"
                style={styles.inputField}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="button"
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleImageUpload}
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir Imagen'}
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.primaryButton }}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Perfil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InitialSetupPage
