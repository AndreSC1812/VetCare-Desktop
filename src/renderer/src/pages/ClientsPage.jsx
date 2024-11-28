import React, { useState, useEffect } from 'react'
import { getClientsRequest, getClientByIdRequest } from '../api/clients'
import { getPetsByClientRequest } from '../api/pets'

function ClientsPage() {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [isDetailScreen, setIsDetailScreen] = useState(false)

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

  return (
    <div>
      {isDetailScreen ? (
        <div style={detailStyles.container}>
          {/* Botón "Volver" */}
          <button style={detailStyles.backButton} onClick={handleBackToClients}>
            Regresar
          </button>

          {/* Título */}
          <h2 style={detailStyles.title}>Detalles del Usuario</h2>

          {/* Card de detalles del cliente */}
          <div style={detailStyles.clientDetails}>
            <img
              src={selectedClient.profileImage || 'https://via.placeholder.com/100'}
              alt={selectedClient.fullname}
              style={detailStyles.image}
            />
            <h3 style={detailStyles.fullname}>{selectedClient.fullname}</h3>
            <p style={detailStyles.username}>@{selectedClient.username || 'Usuario desconocido'}</p>

            {/* Información adicional */}
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
            {/* Botón de enviar notificación */}
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
              onClick={() => alert('Función aún no implementada')}
            >
              Enviar Notificación por Correo
            </button>

            {/* Lista de mascotas */}
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
                  </div>
                ))
              ) : (
                <p>No hay mascotas para este cliente.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Lista de clientes
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
    </div>
  )
}

export default ClientsPage
