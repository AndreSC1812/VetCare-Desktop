import React, { useState, useEffect } from 'react'
import { getClientsRequest, getClientByIdRequest } from '../api/clients'
import { getPetsByClientRequest } from '../api/pets'
import { sendNotificationRequest } from '../api/notifications'
import { useNavigate } from 'react-router-dom'

function ClientsPage() {
  const navigate = useNavigate()

  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('') // Error global para clientes
  const [emailError, setEmailError] = useState('') // Error específico para el modal de correo
  const [successMessage, setSuccessMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [isDetailScreen, setIsDetailScreen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [emailMessage, setEmailMessage] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getClientsRequest()
      setClients(response.data)
      setFilteredClients(response.data)
    } catch (err) {
      setError('Error al obtener los clientes. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query === '') {
      setFilteredClients(clients)
    } else {
      setFilteredClients(
        clients.filter(
          (client) =>
            client.fullname?.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query)
        )
      )
    }
  }

  const handleCreateReport = (pet) => {
    navigate('/create-report', { state: { client: selectedClient, pet } })
  }

  const handleClientClick = async (clientId) => {
    try {
      const clientResponse = await getClientByIdRequest(clientId)
      const petsResponse = await getPetsByClientRequest(clientId)

      setSelectedClient({
        ...clientResponse.data,
        pets: petsResponse.data.pets
      })
      setIsDetailScreen(true)
    } catch (err) {
      console.error('Error al obtener los detalles del cliente:', err)
      setError('No se pudieron obtener los detalles del cliente.')
    }
  }

  const handleBackToClients = () => {
    setIsDetailScreen(false)
    setSelectedClient(null)
  }

  const handleSendEmail = async () => {
    const fullname = localStorage.getItem('fullname') // Nombre del veterinario
    const to = selectedClient.email // Correo del cliente
    const message = emailMessage // Mensaje del modal

    if (!message.trim()) {
      setEmailError('Por favor, escribe un mensaje antes de enviar.')
      return
    }

    try {
      await sendNotificationRequest({ to, fullname, message })
      setIsDialogOpen(false) // Cierra el modal
      setEmailMessage('') // Limpia el mensaje
      setEmailError('') // Limpia el error del modal
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      setEmailError('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.')
    }
  }

  // Estilos para la lista de clientes
  const listStyles = {
    title: {
      textAlign: 'center',
      color: '#3bbba4',
      fontSize: '24px',
      marginBottom: '20px'
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    searchInput: {
      width: '300px',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    clientListContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center'
    },
    card: {
      width: '250px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      backgroundColor: '#fff',
      textAlign: 'center',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    image: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '15px'
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    email: {
      color: '#555',
      fontSize: '16px',
      marginBottom: '10px'
    },
    error: {
      color: 'red',
      textAlign: 'center'
    },
    success: {
      color: 'green',
      textAlign: 'center'
    },
    loading: {
      textAlign: 'center'
    }
  }

  // Estilos para la pantalla de detalles del cliente
  const detailStyles = {
    container: {
      position: 'relative',
      textAlign: 'center',
      padding: '20px'
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '8px 16px',
      backgroundColor: '#3bbba4',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '14px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#3bbba4'
    },
    clientDetails: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      width: '80%',
      maxWidth: '1000px',
      borderRadius: '8px'
    },
    image: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto 15px',
      display: 'block',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    fullname: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333'
    },
    username: {
      fontSize: '18px',
      fontStyle: 'italic',
      color: '#777',
      marginBottom: '20px'
    },
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '600px',
      textAlign: 'left',
      color: '#555'
    },
    cardItem: {
      marginBottom: '10px'
    },
    petCard: {
      width: '200px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      backgroundColor: '#fff',
      textAlign: 'center',
      margin: '10px'
    }
  }

  // Estilos del modal
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '400px',
      maxWidth: '90%',
      textAlign: 'center'
    },
    textarea: {
      width: '100%',
      height: '100px',
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    button: {
      margin: '0 10px',
      padding: '10px 20px',
      backgroundColor: '#3bbba4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    buttonHover: {
      backgroundColor: '#32a792'
    }
  }

  return (
    <div>
      {isDetailScreen ? (
        <div style={detailStyles.container}>
          <button style={detailStyles.backButton} onClick={handleBackToClients}>
            Regresar
          </button>
          <h2 style={detailStyles.title}>Detalles del Usuario</h2>
          <div style={detailStyles.clientDetails}>
            <img
              src={selectedClient.profileImage || 'https://via.placeholder.com/100'}
              alt={selectedClient.fullname}
              style={detailStyles.image}
            />
            <h3 style={detailStyles.fullname}>{selectedClient.fullname}</h3>
            <p style={detailStyles.username}>@{selectedClient.username || 'Usuario desconocido'}</p>
            <div style={detailStyles.card}>
              <p style={detailStyles.cardItem}>
                <strong>Email:</strong> {selectedClient.email}
              </p>
              <p style={detailStyles.cardItem}>
                <strong>Teléfono:</strong> {selectedClient.phone}
              </p>
              <p style={detailStyles.cardItem}>
                <strong>Dirección:</strong> {selectedClient.address}
              </p>
            </div>
            <button
              style={{
                backgroundColor: '#3bbba4',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                margin: '20px auto',
                display: 'block'
              }}
              onClick={() => setIsDialogOpen(true)}
            >
              Enviar Notificación por Correo
            </button>
            <h4>Mascotas</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {selectedClient.pets.length > 0 ? (
                selectedClient.pets.map((pet) => (
                  <div key={pet._id} style={detailStyles.petCard}>
                    <img
                      src={pet.image || 'https://via.placeholder.com/100'}
                      alt={pet.name}
                      style={detailStyles.image}
                    />
                    <div>{pet.name}</div>
                    <div>{pet.species}</div>
                    <div>Edad: {pet.age}</div>
                    <button
                      style={{
                        backgroundColor: '#3bbba4',
                        color: 'white',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        marginTop: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleCreateReport(pet)}
                    >
                      Crear Informe
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay mascotas para este cliente.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 style={listStyles.title}>Clientes</h2>
          <div style={listStyles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchQuery}
              onChange={handleSearch}
              style={listStyles.searchInput}
            />
          </div>
          {loading && <p style={listStyles.loading}>Cargando...</p>}
          {error && <p style={listStyles.error}>{error}</p>}
          {successMessage && <p style={listStyles.success}>{successMessage}</p>}
          <div style={listStyles.clientListContainer}>
            {filteredClients.map((client) => (
              <div
                key={client._id}
                style={listStyles.card}
                onClick={() => handleClientClick(client._id)}
              >
                <img
                  src={client.profileImage || 'https://via.placeholder.com/100'}
                  alt={client.fullname || 'Sin nombre'}
                  style={listStyles.image}
                />
                <div style={listStyles.name}>{client.fullname || 'Sin nombre'}</div>
                <div style={listStyles.email}>{client.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isDialogOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Enviar Notificación</h2>
            <textarea
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              style={modalStyles.textarea}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <button
              style={modalStyles.button}
              onClick={handleSendEmail}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = modalStyles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = modalStyles.button.backgroundColor)
              }
            >
              Enviar
            </button>
            <button
              style={modalStyles.button}
              onClick={() => setIsDialogOpen(false)}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = modalStyles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = modalStyles.button.backgroundColor)
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientsPage
