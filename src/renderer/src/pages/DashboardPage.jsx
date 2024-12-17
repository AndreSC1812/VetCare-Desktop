import React, { useState } from 'react'
import ClientsPage from './ClientsPage' // Importar el nuevo componente
import ReportsPage from './ReportsPage'
import AppointmentsPage from './AppointmentsPage'
import VetProfilePage from './VetProfilePage'

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('clientes')

  const renderContent = () => {
    switch (activeTab) {
      case 'clientes':
        return <ClientsPage />
      case 'informes':
        return <ReportsPage />
      case 'citas':
        return <AppointmentsPage />
      case 'perfil':
        return <VetProfilePage />
      default:
        return null
    }
  }

  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh'
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#3bbba4',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      height: '100vh', // Mantener la barra lateral siempre en pantalla completa
      position: 'fixed', // Fijamos la barra lateral a la izquierda
      top: 0,
      left: 0
    },
    appTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center'
    },
    tabList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0
    },
    tabItem: {
      padding: '10px 15px',
      cursor: 'pointer',
      fontSize: '18px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease'
    },
    tabItemHover: {
      backgroundColor: '#34a08d'
    },
    tabItemActive: {
      backgroundColor: '#2f8d7c',
      fontWeight: 'bold'
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      marginLeft: '250px', // Dejamos espacio para la barra lateral
      backgroundColor: '#f7f7f7',
      overflowY: 'auto', // Permite el desplazamiento en caso de que haya mucho contenido
      height: '100vh' // Esto asegura que el contenido se ajuste a toda la pantalla
    }
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <div style={styles.appTitle}>Vetcare</div>
        <ul style={styles.tabList}>
          {['clientes', 'informes', 'citas', 'perfil'].map((tab) => (
            <li
              key={tab}
              style={{
                ...styles.tabItem,
                ...(activeTab === tab ? styles.tabItemActive : {})
              }}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#34a08d')}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = activeTab === tab ? '#2f8d7c' : '')
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.content}>{renderContent()}</div>
    </div>
  )
}

export default DashboardPage
