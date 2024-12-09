import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadProfileImageRequest, updateProfileRequest } from '../api/profile'

function InitialSetupPage() {
  const [fullname, setFullname] = useState('') // Nuevo estado para el nombre completo
  const [specialization, setSpecialization] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [clinicAddress, setClinicAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('') // Nuevo estado para el mensaje de éxito
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProfileImage(file)
    if (file) {
      if (file.type.startsWith('image/')) {
        setPreviewImage(URL.createObjectURL(file))
        setError('')
      } else {
        setError('Por favor, selecciona una imagen válida')
        setPreviewImage(null)
      }
    } else {
      setPreviewImage(null)
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!profileImage) {
      setError('Por favor, selecciona una imagen')
      return
    }

    try {
      setLoading(true)
      await uploadProfileImageRequest(profileImage)
      setSuccess('Imagen de perfil subida exitosamente')
    } catch (error) {
      setError('Error al subir la imagen, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const profileData = {
      fullname, // Incluir fullname en los datos del perfil
      specialization,
      yearsOfExperience,
      clinicAddress,
      phone
    }

    try {
      setLoading(true)
      await updateProfileRequest(profileData) // Llamada al backend para guardar los datos
      localStorage.setItem('fullname', fullname) // Almacenar el fullname en localStorage
      setSuccess('Datos del perfil actualizados correctamente')
      navigate('/dashboard') // Redirigir al dashboard
    } catch (error) {
      setError('Error al actualizar los datos del perfil, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Estilos en línea
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      height: '100%',
      boxSizing: 'border-box'
    },
    html: {
      height: '100%',
      margin: 0,
      padding: 0
    },
    container: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#3bbba4'
    },
    card: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      width: '100%',
      marginBottom: '0'
    },
    imageContainer: {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginBottom: '15px',
      backgroundColor: '#f0f0f0',
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
      width: '100%'
    },
    secondaryButton: {
      backgroundColor: '#3bbba4',
      color: '#fff',
      marginBottom: '1rem'
    },
    primaryButton: {
      backgroundColor: '#3bbba4',
      color: '#fff'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '0.75rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
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

          {success && <div style={styles.successMessage}>{success}</div>}
          {error && <div style={styles.errorMessage}>{error}</div>}

          <div className="text-center mb-4">
            {previewImage ? (
              <img src={previewImage} alt="Vista previa de perfil" style={styles.imagePreview} />
            ) : (
              <div style={styles.imageContainer} />
            )}
            <div className="mt-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            {/* Campo para Nombre Completo */}
            <div className="form-group" style={styles.formControl}>
              <label>Nombre Completo</label>
              <input
                type="text"
                style={styles.inputField}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            {/* Otros campos del formulario */}
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
