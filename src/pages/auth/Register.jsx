import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, AlertCircle, UserCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import styles from './Auth.module.css'

const Register = () => {
  const { register: registerUser, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await registerUser(data)
    setIsLoading(false)

    if (result.success) {
      toast.success(`Account created! Welcome, ${result.user.name}! 🎉`)
      navigate('/onboarding')
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
        <div className={styles.cardHeader}>
          <Link to="/" className={styles.logo} aria-label="CareerCanvas AI home">
            <div className={styles.logoIcon}><Zap size={18} color="white" /></div>
            <span>CareerCanvas <strong>AI</strong></span>
          </Link>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>Start designing your career journey today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Anas Javed Khan"
              autoComplete="name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'At least 2 characters' }
              })}
            />
            {errors.name && (
              <span className="form-error" role="alert">
                <AlertCircle size={13} />{errors.name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">Email address</label>
            <input
              id="reg-email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
              })}
            />
            {errors.email && (
              <span className="form-error" role="alert">
                <AlertCircle size={13} />{errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">Password</label>
            <div className={styles.passwordWrap}>
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="At least 6 characters"
                autoComplete="new-password"
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
              <span className="form-error" role="alert">
                <AlertCircle size={13} />{errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm" className="form-label">Confirm Password</label>
            <input
              id="confirm"
              type={showPass ? 'text' : 'password'}
              className={`form-input ${errors.confirm ? 'error' : ''}`}
              placeholder="Repeat password"
              autoComplete="new-password"
              {...register('confirm', {
                required: 'Please confirm your password',
                validate: v => v === password || 'Passwords do not match'
              })}
            />
            {errors.confirm && (
              <span className="form-error" role="alert">
                <AlertCircle size={13} />{errors.confirm.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isLoading}
            id="register-submit-btn"
          >
            {isLoading ? <span className={styles.spinner} /> : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <button
          className={`btn btn-secondary ${styles.guestBtn}`}
          onClick={handleGuest}
          id="guest-register-btn"
        >
          <UserCheck size={16} />
          Continue as Guest
        </button>

        <p className={styles.switchLink}>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register
