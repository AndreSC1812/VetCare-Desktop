import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getReportsByVeterinarianRequest } from '../api/report'

function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate() // Para navegación

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      setError('')
      try {
        const fetchedReports = await getReportsByVeterinarianRequest()
        setReports(fetchedReports)
      } catch (err) {
        setError('Error al obtener los informes. Intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  // Filtrar informes por nombre de la mascota
  const filteredReports = reports.filter((report) =>
    report.petName.toLowerCase().includes(search.toLowerCase())
  )

  const handleCardClick = (reportId) => {
    navigate(`/report-details`, { state: { reportId } })
  }

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
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    searchInput: {
      padding: '10px',
      fontSize: '16px',
      width: '300px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    reportsContainer: {
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
      cursor: 'pointer' // Agregar cursor de mano para indicar clickeable
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
      backgroundColor: '#f7f7f7',
      padding: '15px',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    loadingText: {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    errorText: {
      color: 'red',
      fontSize: '16px'
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Informes</h2>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Buscar por nombre de mascota"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p style={styles.loadingText}>Cargando informes...</p>}
      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.reportsContainer}>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report._id} style={styles.card} onClick={() => handleCardClick(report._id)}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardHeaderTitle}>{report.petName}</h3>
                <p>{report.species}</p>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardBodyItem}>
                  <strong>Fecha de Consulta:</strong>{' '}
                  {new Date(report.consultationDate).toLocaleDateString()}
                </p>
                <p style={styles.cardBodyItem}>
                  <strong>Diagnóstico:</strong> {report.diagnosis}
                </p>
                <p style={styles.cardBodyItem}>
                  <strong>Razón de Consulta:</strong> {report.consultationReason}
                </p>
                <p style={styles.cardBodyItem}>
                  <strong>Propietario:</strong> {report.ownerName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay informes disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default ReportsPage
