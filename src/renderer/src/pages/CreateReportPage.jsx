import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createReportRequest } from '../api/report'
import Modal from '../components/Modal'

function CreateReportPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { client, pet } = location.state || {} // Usamos location.state para recibir datos
  const veterinarianName = localStorage.getItem('fullname') // Nombre del veterinario desde localStorage

  const initialFormData = {
    ownerName: client?.fullname || '',
    ownerPhone: client?.phone || '',
    ownerEmail: client?.email || '',
    petName: pet?.name || '',
    chipNumber: pet?.chipNumber || '',
    species: pet?.species || '',
    weight: pet?.weight || '',
    consultationDate: new Date().toISOString().split('T')[0], // Fecha actual
    consultationReason: '',
    clinicalSigns: '',
    diagnosis: '',
    treatment: '',
    recommendations: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('') // Mensaje para el modal
  const [modalTitle, setModalTitle] = useState('') //titulo para el modal
  const [showModal, setShowModal] = useState(false) // Controla si el modal se muestra o no

  if (!client || !pet) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Error: No se pasaron datos del cliente o mascota.</h2>
        <button onClick={() => navigate(-1)}>Regresar</button>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    const { ownerName, ownerPhone, ownerEmail, petName, chipNumber, species, consultationReason } =
      formData

    // Validaciones básicas
    if (
      !ownerName ||
      !ownerPhone ||
      !ownerEmail ||
      !petName ||
      !chipNumber ||
      !species ||
      !consultationReason
    ) {
      setError('Por favor, completa todos los campos obligatorios.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await createReportRequest({
        ...formData,
        petId: pet._id,
        veterinarianId: localStorage.getItem('veterinarianId') // ID del veterinario desde localStorage
      })

      setModalTitle('¡Informe creado con éxito!')
      setModalMessage('se creo el informe correctamente')
      setShowModal(true) // Mostrar el modal de éxito

      // Resetear el formulario después de crear el informe
      setFormData(initialFormData)
    } catch (err) {
      console.error('Error al crear el informe:', err)
      setError('No se pudo crear el informe. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    navigate('/dashboard') // Redirige a la página del Dashboard después de cerrar el modal
  }

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#3bbba4', // Fondo de la página
      minHeight: '100vh' // Asegura que ocupe toda la pantalla
    },
    form: {
      margin: '0 auto',
      maxWidth: '600px',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white' // Título en blanco
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#3bbba4' // Título de las secciones en color verde
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      height: '100px',
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#3bbba4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    error: {
      color: 'red',
      marginBottom: '20px'
    },
    backButton: {
      position: 'fixed',
      top: '20px',
      left: '20px',
      padding: '10px 20px',
      backgroundColor: 'white', // Botón Volver blanco
      color: '#3bbba4', // Texto en color #3bbba4
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      zIndex: '1000'
    }
  }

  return (
    <div>
      <button
        style={styles.backButton}
        onClick={() => navigate('/dashboard')} // Volver al dashboard
      >
        Volver
      </button>
      <div style={styles.container}>
        <h2 style={styles.title}>Crear Informe para {pet.name}</h2>
        <div style={styles.form}>
          <div>
            <h3 style={styles.sectionTitle}>Datos del Cliente</h3>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Nombre del dueño"
              style={styles.input}
            />
            <input
              type="text"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              placeholder="Teléfono del dueño"
              style={styles.input}
            />
            <input
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Email del dueño"
              style={styles.input}
            />
          </div>

          <div>
            <h3 style={styles.sectionTitle}>Datos de la Mascota</h3>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              placeholder="Nombre de la mascota"
              style={styles.input}
            />
            <input
              type="text"
              name="chipNumber"
              value={formData.chipNumber}
              onChange={handleChange}
              placeholder="Número de chip"
              style={styles.input}
            />
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              placeholder="Especie"
              style={styles.input}
            />
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Peso"
              style={styles.input}
            />
          </div>

          <div>
            <h3 style={styles.sectionTitle}>Informe</h3>
            <input
              type="date"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleChange}
              style={styles.input}
            />
            <textarea
              name="consultationReason"
              value={formData.consultationReason}
              onChange={handleChange}
              placeholder="Motivo de consulta"
              style={styles.textarea}
            />
            <textarea
              name="clinicalSigns"
              value={formData.clinicalSigns}
              onChange={handleChange}
              placeholder="Signos clínicos"
              style={styles.textarea}
            />
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Diagnóstico"
              style={styles.textarea}
            />
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Tratamiento"
              style={styles.textarea}
            />
            <textarea
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              placeholder="Recomendaciones"
              style={styles.textarea}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creando...' : 'Crear Informe'}
          </button>
        </div>
      </div>

      {/* Mostrar el Modal si es necesario */}
      {showModal && <Modal title={modalTitle} message={modalMessage} onClose={closeModal} />}
    </div>
  )
}

export default CreateReportPage
