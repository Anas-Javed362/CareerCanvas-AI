import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, AlertCircle, UserCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import styles from './Auth.module.css'

const Login = () => {
  const { login, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await login(data)
    setIsLoading(false)

    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}! 👋`)
      const onboarding = localStorage.getItem('careercanvas_onboarding')
      navigate(onboarding ? '/dashboard' : '/onboarding')
    } else {
      toast.error(result.error)
    }
  }

  const handleGuest = () => {
    loginAsGuest()
    toast.info('Continuing as guest. Data will be saved locally.')
    navigate('/onboarding')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgDecor} aria-hidden="true" />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className={styles.cardHeader}>
          <Link to="/" className={styles.logo} aria-label="CareerCanvas AI home">
            <div className={styles.logoIcon}><Zap size={18} color="white" /></div>
            <span>CareerCanvas <strong>AI</strong></span>
          </Link>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to continue your career journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
              })}
            />
            {errors.email && (
              <span className="form-error" id="email-error" role="alert">
                <AlertCircle size={13} />{errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={errors.password ? 'password-error' : undefined}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'At least 6 characters' }
                })}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPass(p => !p)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="form-error" id="password-error" role="alert">
                <AlertCircle size={13} />{errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isLoading}
            id="login-submit-btn"
          >
            {isLoading ? <span className={styles.spinner} /> : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <button
          className={`btn btn-secondary ${styles.guestBtn}`}
          onClick={handleGuest}
          id="guest-login-btn"
        >
          <UserCheck size={16} />
          Continue as Guest
        </button>

        <p className={styles.switchLink}>
          Don&apos;t have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
