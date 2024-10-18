import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import vetcareLogo from '../assets/vetcare-logo.svg'
import { Link } from 'react-router-dom'
import { loginRequest } from '../api/auth'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // Estado para el toggle de contraseña
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    const credentials = { email, password, userType: 'veterinarian' }

    try {
      setLoading(true)
      const response = await loginRequest(credentials)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      } else {
        setError('Error al iniciar sesión, intenta de nuevo')
      }
    } catch (error) {
      setError('Error en la conexión, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center">
          <img src={vetcareLogo} alt="Vetcare Logo" width="150" />
          <h2 className="mt-3">Iniciar Sesión</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#3bbba4' }} // Bordes acorde al color Vetcare
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
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado del toggle
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>{' '}
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
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" style={{ color: '#3bbba4' }}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
