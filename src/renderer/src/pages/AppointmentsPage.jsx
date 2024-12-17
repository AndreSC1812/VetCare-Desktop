import React, { useState, useEffect } from 'react'
import {
  getAppointmentsByVeterinarianRequest,
  changeAppointmentStatusRequest
} from '../api/appointment.js' // Importa las funciones

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointmentsByVeterinarianRequest()
        setAppointments(response.data)
      } catch (error) {
        setError('Error al obtener las citas. Intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Función para cambiar el estado de la cita
  const changeStatus = async (appointmentId, newStatus) => {
    try {
      const response = await changeAppointmentStatusRequest(appointmentId, newStatus) // Cambiar estado
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? response.data : appointment
        )
      )
    } catch (error) {
      setError('Error al actualizar el estado de la cita.')
    }
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
    appointmentsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    cardHeader: {
      backgroundColor: '#3bbba4',
      color: 'white',
      padding: '15px',
      textAlign: 'center'
    },
    cardHeaderTitle: {
      margin: '0',
      fontSize: '20px'
    },
    cardBody: {
      padding: '15px',
      fontSize: '16px'
    },
    cardBodyItem: {
      margin: '10px 0'
    },
    cardFooter: {
      padding: '15px',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#3bbba4', // Botón verde (confirmar)
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '14px',
      border: 'none',
      marginRight: '10px' // Espaciado entre los botones
    },
    cancelButton: {
      backgroundColor: '#e74c3c', // Botón rojo (cancelar)
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '14px',
      border: 'none',
      marginRight: '10px' // Espaciado entre los botones
    },
    loadingText: {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    errorText: {
      color: 'red',
      fontSize: '16px',
      textAlign: 'center'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Citas del Veterinario</h2>

      {loading && <p style={styles.loadingText}>Cargando citas...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.appointmentsContainer}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardHeaderTitle}>{appointment.clientFullname}</h3>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardBodyItem}>
                  <strong>Fecha de la Cita:</strong>
                  {new Date(appointment.date).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
                <p style={styles.cardBodyItem}>
                  <strong>Estado:</strong> {appointment.status}
                </p>
              </div>
              <div style={styles.cardFooter}>
                {appointment.status === 'Pendiente' && (
                  <>
                    <button
                      onClick={() => changeStatus(appointment._id, 'Confirmada')}
                      style={styles.button}
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => changeStatus(appointment._id, 'Cancelada')}
                      style={styles.cancelButton}
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No hay citas disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage
