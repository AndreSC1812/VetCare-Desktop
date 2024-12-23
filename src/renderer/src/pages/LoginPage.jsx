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
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('') // Limpiar los errores previos

    const credentials = { email, password, userType: 'veterinarian' }

    try {
      setLoading(true)
      const response = await loginRequest(credentials)

      if (response.status === 200) {
        const { token, user } = response.data

        // Guardar el token, fullname y id en el localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('fullname', user.fullname)
        localStorage.setItem('userId', user.id) // Guardando el id

        const fullname = localStorage.getItem('fullname')
        console.log(fullname) // Muestra el nombre completo del usuario
        console.log(user.id) // Muestra el id del usuario

        navigate('/dashboard') // Redirigir al dashboard
      } else {
        setError('Error al iniciar sesión, intenta de nuevo')
      }
    } catch (error) {
      // Si el error tiene una respuesta del backend, mostramos el mensaje específico
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Error en la conexión, intenta de nuevo')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center">
          <img src={vetcareLogo} alt="Vetcare Logo" width="150" />
          <h2 className="mt-3 mb-3">Iniciar Sesión</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#3bbba4' }}
            />
          </div>
          <div className="form-group mt-3">
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderColor: '#3bbba4' }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ border: 'none' }}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
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
