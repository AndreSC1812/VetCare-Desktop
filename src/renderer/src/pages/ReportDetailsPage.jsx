import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getReportByIdRequest } from '../api/report'
import { jsPDF } from 'jspdf'

function ReportDetailsPage() {
  const location = useLocation()
  const { reportId } = location.state || {}
  const [report, setReport] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (reportId) {
      const fetchReport = async () => {
        setLoading(true)
        try {
          const fetchedReport = await getReportByIdRequest(reportId)
          setReport(fetchedReport)
        } catch (err) {
          setError('No se pudo obtener el informe.')
        } finally {
          setLoading(false)
        }
      }
      fetchReport()
    }
  }, [reportId])

  if (error) {
    return <p>{error}</p>
  }

  if (loading || !report) {
    return <p>Cargando...</p>
  }

  const handleEditClick = () => {
    // Aquí puedes agregar la lógica para editar en el futuro
    console.log('Editar clickeado')
  }

  const handleDeleteClick = () => {
    // Aquí puedes agregar la lógica para eliminar en el futuro
    console.log('Eliminar clickeado')
  }

  const handleExportToPDF = () => {
    const doc = new jsPDF()

    // Definir colores
    const primaryColor = '#3bbba4' // El color principal que se usará para los rectángulos
    const textColor = '#333' // El color del texto (negro en este caso)

    // Título del informe
    doc.setFontSize(18)
    doc.setTextColor(primaryColor)
    doc.text('Detalles del Informe', 20, 20)

    // Datos del Cliente
    doc.setFontSize(12)
    doc.setTextColor(textColor) // Usar texto negro para los datos del cliente
    doc.text(`Nombre del Dueño: ${report.ownerName}`, 20, 50)
    doc.text(`Teléfono del Dueño: ${report.ownerPhone}`, 20, 60)
    doc.text(`Email del Dueño: ${report.ownerEmail}`, 20, 70)

    // Añadir bordes y sombreado para la sección de Datos del Cliente
    doc.setDrawColor(200, 200, 200) // Color del borde
    doc.setFillColor(primaryColor) // Cambiar a primaryColor
    doc.rect(15, 30, 180, 10, 'F')
    doc.setTextColor('white') // Color del texto dentro del rectángulo
    doc.text('Datos del Cliente', 18, 35)

    // Datos de la Mascota
    doc.setFontSize(12)
    doc.setTextColor(textColor) // Usar texto negro para los datos de la mascota
    doc.text(`Nombre de la Mascota: ${report.petName}`, 20, 100)
    doc.text(`Número de Chip: ${report.chipNumber}`, 20, 110)
    doc.text(`Especie: ${report.species}`, 20, 120)
    doc.text(`Peso: ${report.weight} kg`, 20, 130)

    // Añadir bordes y sombreado para la sección de Datos de la Mascota
    doc.setFillColor(primaryColor)
    doc.rect(15, 80, 180, 10, 'F')
    doc.setTextColor('white') // Cambiar color del texto (blanco) para la siguiente sección
    doc.text('Datos de la Mascota', 18, 85)

    // Informe
    doc.setFontSize(12)
    doc.setTextColor(textColor) // Usar texto negro para el informe
    doc.text(`Fecha de Consulta: ${report.consultationDate}`, 20, 160)
    doc.text(`Motivo de Consulta: ${report.consultationReason}`, 20, 170)
    doc.text(`Signos Clínicos: ${report.clinicalSigns}`, 20, 180)
    doc.text(`Diagnóstico: ${report.diagnosis}`, 20, 190)
    doc.text(`Tratamiento: ${report.treatment}`, 20, 200)
    doc.text(`Recomendaciones: ${report.recommendations}`, 20, 210)

    // Añadir bordes y sombreado para la sección del Informe
    doc.setFillColor(primaryColor)
    doc.rect(15, 150, 180, 10, 'F')
    doc.setTextColor('white') // Cambiar color del texto (blanco) para la siguiente sección
    doc.text('Informe', 18, 155)

    // Generar el PDF
    doc.save(`Informe_${report.petName}_${report.ownerName}.pdf`)
  }

  const handleBackClick = () => {
    navigate(-1)
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
    editButton: {
      padding: '10px 20px',
      backgroundColor: '#3bbba4',
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
              <strong>Fecha de Consulta:</strong> {report.consultationDate}
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
            <button style={styles.editButton} onClick={handleEditClick}>
              Editar
            </button>
            <button style={styles.actionButton} onClick={handleDeleteClick}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportDetailsPage
