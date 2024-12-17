import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getReportByIdRequest, updateReportRequest, deleteReportRequest } from '../api/report'
import { jsPDF } from 'jspdf'

function ReportDetailsPage() {
  const location = useLocation()
  const { reportId } = location.state || {}
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editedReport, setEditedReport] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (reportId) {
      const fetchReport = async () => {
        setLoading(true)
        try {
          const fetchedReport = await getReportByIdRequest(reportId)
          setReport(fetchedReport)
          setEditedReport(fetchedReport)
        } catch (err) {
          setError('No se pudo obtener el informe.')
        } finally {
          setLoading(false)
        }
      }
      fetchReport()
    }
  }, [reportId])

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditedReport({
      ...editedReport,
      [name]: value
    })
  }

  const handleEditSubmit = async () => {
    try {
      await updateReportRequest(reportId, editedReport)
      setReport(editedReport)
      setShowEditModal(false)
    } catch (error) {
      setError('No se pudo actualizar el informe.')
    }
  }

  const handleEditClick = () => {
    setShowEditModal(true)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setShowDeleteModal(false)

    try {
      await deleteReportRequest(reportId)
      navigate('/dashboard')
    } catch (error) {
      setError('No se pudo eliminar el informe.')
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
  }

  const handleExportToPDF = () => {
    const doc = new jsPDF()

    const primaryColor = '#3bbba4'
    const textColor = '#333'

    doc.setFontSize(18)
    doc.setTextColor(primaryColor)
    doc.text('Detalles del Informe', 20, 20)

    doc.setFontSize(12)
    doc.setTextColor(textColor)
    doc.text(`Nombre del Dueño: ${report.ownerName}`, 20, 50)
    doc.text(`Teléfono del Dueño: ${report.ownerPhone}`, 20, 60)
    doc.text(`Email del Dueño: ${report.ownerEmail}`, 20, 70)

    doc.setDrawColor(200, 200, 200)
    doc.setFillColor(primaryColor)
    doc.rect(15, 30, 180, 10, 'F')
    doc.setTextColor('white')
    doc.text('Datos del Cliente', 18, 35)

    doc.setFontSize(12)
    doc.setTextColor(textColor)
    doc.text(`Nombre de la Mascota: ${report.petName}`, 20, 100)
    doc.text(`Número de Chip: ${report.chipNumber}`, 20, 110)
    doc.text(`Especie: ${report.species}`, 20, 120)
    doc.text(`Peso: ${report.weight} kg`, 20, 130)

    doc.setFillColor(primaryColor)
    doc.rect(15, 80, 180, 10, 'F')
    doc.setTextColor('white')
    doc.text('Datos de la Mascota', 18, 85)

    doc.setFontSize(12)
    doc.setTextColor(textColor)
    doc.text(`Fecha de Consulta: ${report.consultationDate}`, 20, 160)
    doc.text(`Motivo de Consulta: ${report.consultationReason}`, 20, 170)
    doc.text(`Signos Clínicos: ${report.clinicalSigns}`, 20, 180)
    doc.text(`Diagnóstico: ${report.diagnosis}`, 20, 190)
    doc.text(`Tratamiento: ${report.treatment}`, 20, 200)
    doc.text(`Recomendaciones: ${report.recommendations}`, 20, 210)

    doc.setFillColor(primaryColor)
    doc.rect(15, 150, 180, 10, 'F')
    doc.setTextColor('white')
    doc.text('Informe', 18, 155)

    doc.save(`Informe_${report.petName}_${report.ownerName}.pdf`)
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES') // Formato de fecha en español (España)
  }

  if (error) {
    return <p>{error}</p>
  }

  if (loading || !report) {
    return <p>Cargando...</p>
  }

  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#3bbba4',
      minHeight: '100vh',
      margin: 0
    },
    card: {
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px auto'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white',
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: '#3bbba4'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#3bbba4'
    },
    detail: {
      marginBottom: '10px',
      fontSize: '16px',
      textAlign: 'left',
      fontWeight: 'normal',
      padding: '5px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#3bbba4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
      marginBottom: '10px',
      marginRight: '10px'
    },
    actionButton: {
      padding: '10px 20px',
      backgroundColor: '#ff5733',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
      marginBottom: '10px',
      marginRight: '10px'
    },
    backButton: {
      position: 'fixed',
      top: '20px',
      left: '20px',
      backgroundColor: 'white',
      color: '#3bbba4',
      border: '1px solid #3bbba4',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      width: '300px',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.1)'
    },
    modalButton: {
      padding: '10px 20px',
      backgroundColor: '#3bbba4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '14px'
    }
  }

  return (
    <div style={{ margin: 0 }}>
      <button style={styles.backButton} onClick={handleBackClick}>
        Atrás
      </button>

      <div style={styles.container}>
        <div style={styles.title}>Detalles del Informe</div>

        <div style={styles.card}>
          <div>
            <h3 style={styles.sectionTitle}>Datos del Cliente</h3>
            <div style={styles.detail}>
              <strong>Nombre del Dueño:</strong> {report.ownerName}
            </div>
            <div style={styles.detail}>
              <strong>Teléfono del Dueño:</strong> {report.ownerPhone}
            </div>
            <div style={styles.detail}>
              <strong>Email del Dueño:</strong> {report.ownerEmail}
            </div>
          </div>

          <div>
            <h3 style={styles.sectionTitle}>Datos de la Mascota</h3>
            <div style={styles.detail}>
              <strong>Nombre de la Mascota:</strong> {report.petName}
            </div>
            <div style={styles.detail}>
              <strong>Número de Chip:</strong> {report.chipNumber}
            </div>
            <div style={styles.detail}>
              <strong>Especie:</strong> {report.species}
            </div>
            <div style={styles.detail}>
              <strong>Peso:</strong> {report.weight}
            </div>
          </div>

          <div>
            <h3 style={styles.sectionTitle}>Informe</h3>
            <div style={styles.detail}>
              <strong>Fecha de Consulta:</strong> {formatDate(report.consultationDate)}
            </div>
            <div style={styles.detail}>
              <strong>Motivo de Consulta:</strong> {report.consultationReason}
            </div>
            <div style={styles.detail}>
              <strong>Signos Clínicos:</strong> {report.clinicalSigns}
            </div>
            <div style={styles.detail}>
              <strong>Diagnóstico:</strong> {report.diagnosis}
            </div>
            <div style={styles.detail}>
              <strong>Tratamiento:</strong> {report.treatment}
            </div>
            <div style={styles.detail}>
              <strong>Recomendaciones:</strong> {report.recommendations}
            </div>
          </div>

          <div>
            <button style={styles.button} onClick={handleExportToPDF}>
              Exportar a PDF
            </button>
            <button style={styles.button} onClick={handleEditClick}>
              Editar Informe
            </button>
            <button style={styles.actionButton} onClick={handleDeleteClick}>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Editar Informe</h3>
            <input
              style={styles.input}
              type="text"
              name="consultationReason"
              value={editedReport.consultationReason}
              onChange={handleEditChange}
              placeholder="Motivo de consulta"
            />
            <textarea
              style={styles.input}
              name="clinicalSigns"
              value={editedReport.clinicalSigns}
              onChange={handleEditChange}
              placeholder="Signos clínicos"
            />
            <textarea
              style={styles.input}
              name="diagnosis"
              value={editedReport.diagnosis}
              onChange={handleEditChange}
              placeholder="Diagnóstico"
            />
            <textarea
              style={styles.input}
              name="treatment"
              value={editedReport.treatment}
              onChange={handleEditChange}
              placeholder="Tratamiento"
            />
            <textarea
              style={styles.input}
              name="recommendations"
              value={editedReport.recommendations}
              onChange={handleEditChange}
              placeholder="Recomendaciones"
            />
            <button style={styles.modalButton} onClick={handleEditSubmit}>
              Guardar Cambios
            </button>
            <button style={styles.modalButton} onClick={() => setShowEditModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>¿Estás seguro de eliminar este informe?</h3>
            <button style={styles.modalButton} onClick={confirmDelete}>
              Confirmar
            </button>
            <button style={styles.modalButton} onClick={cancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportDetailsPage
