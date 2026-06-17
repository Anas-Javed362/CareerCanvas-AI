import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  // Initialize auth from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER)
    const savedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials) => {
    try {
      // Try backend first
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(data.user))
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.token)
        return { success: true, user: data.user }
      }
    } catch {
      // Fallback: local auth
    }

    // LocalStorage fallback
    const users = JSON.parse(localStorage.getItem('careercanvas_users') || '[]')
    const found = users.find(u => u.email === credentials.email && u.password === btoa(credentials.password))
    if (found) {
      const { password: _, ...safeUser } = found
      const mockToken = btoa(JSON.stringify({ id: safeUser.id, exp: Date.now() + 86400000 }))
      setUser(safeUser)
      setToken(mockToken)
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(safeUser))
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, mockToken)
      return { success: true, user: safeUser }
    }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(data.user))
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.token)
        return { success: true, user: data.user }
      }
    } catch {
      // Fallback
    }

    // LocalStorage fallback
    const users = JSON.parse(localStorage.getItem('careercanvas_users') || '[]')
    const exists = users.find(u => u.email === userData.email)
    if (exists) return { success: false, error: 'Email already registered' }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: btoa(userData.password),
      createdAt: new Date().toISOString(),
      avatar: null
    }

    users.push(newUser)
    localStorage.setItem('careercanvas_users', JSON.stringify(users))

    const { password: _, ...safeUser } = newUser
    const mockToken = btoa(JSON.stringify({ id: safeUser.id, exp: Date.now() + 86400000 }))
    setUser(safeUser)
    setToken(mockToken)
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(safeUser))
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, mockToken)
    return { success: true, user: safeUser }
  }, [])

  const loginAsGuest = useCallback(() => {
    const guestUser = {
      id: 'guest-' + Date.now(),
      name: 'Guest User',
      email: 'guest@careercanvas.ai',
      isGuest: true
    }
    setUser(guestUser)
    setIsGuest(true)
    setToken('guest-token')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setIsGuest(false)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING)
  }, [])

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user, token, isLoading, isGuest,
      isAuthenticated: !!user,
      login, register, logout, loginAsGuest, updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
