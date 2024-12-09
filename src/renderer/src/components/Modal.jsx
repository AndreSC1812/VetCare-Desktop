import React from 'react'

function Modal({ title, message, onClose }) {
  const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center' // Aseguramos que el contenido del modal esté centrado
  }

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  }

  const buttonStyles = {
    backgroundColor: '#3bbba4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }

  return (
    <>
      <div style={overlayStyles} onClick={onClose}></div>
      <div style={modalStyles}>
        <h2>{title}</h2> {/* Mostramos el título pasado como prop o el texto por defecto */}
        <p>{message}</p>
        <button style={buttonStyles} onClick={onClose}>
          Aceptar
        </button>
      </div>
    </>
  )
}

export default Modal
