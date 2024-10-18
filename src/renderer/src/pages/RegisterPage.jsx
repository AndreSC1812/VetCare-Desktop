import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import vetcareLogo from '../assets/vetcare-logo.svg'
import { Link } from 'react-router-dom'
import { registerRequest } from '../api/auth'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // Estado para el toggle de contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // Estado para el toggle de confirmación
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    // Verificación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      console.log('Error: Las contraseñas no coinciden')
      return
    }

    setError('')

    const veterinarian = {
      username,
      email,
      password,
      userType: 'veterinarian'
    }

    try {
      setLoading(true)
      const response = await registerRequest(veterinarian)

      if (response.status === 201) {
        navigate('/dashboard')
      } else {
        setError('Error al registrar, intenta de nuevo')
      }
    } catch (error) {
      setError('Error en la conexión, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="text-center">
          <img src={vetcareLogo} alt="Vetcare Logo" width="150" />
          <h2 className="mt-3">Registrarse</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderColor: '#3bbba4' }}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#3bbba4' }}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'} // Alterna entre texto y contraseña
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderColor: '#3bbba4' }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado del toggle
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>{' '}
                  {/* Ícono de ojo */}
                </button>
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Alterna entre texto y contraseña
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ borderColor: '#3bbba4' }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Cambia el estado del toggle
                >
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>{' '}
                  {/* Ícono de ojo */}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-block mt-4"
            disabled={loading}
            style={{
              backgroundColor: '#3bbba4',
              color: 'white',
              border: 'none'
            }}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" style={{ color: '#3bbba4' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
