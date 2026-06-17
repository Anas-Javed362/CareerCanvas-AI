import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants'

const InternshipContext = createContext(null)

export const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.INTERNSHIPS)
    if (saved) setInternships(JSON.parse(saved))
    else {
      // Seed data
      const seedData = [
        { id: '1', company: 'Google', role: 'Software Engineer Intern', date: '2024-01-15', status: 'interview', notes: 'Strong technical round', link: 'https://careers.google.com', createdAt: new Date().toISOString() },
        { id: '2', company: 'Microsoft', role: 'Frontend Developer Intern', date: '2024-01-20', status: 'applied', notes: 'Applied via LinkedIn', link: 'https://careers.microsoft.com', createdAt: new Date().toISOString() },
        { id: '3', company: 'Amazon', role: 'SDE Intern', date: '2024-01-10', status: 'assessment', notes: 'OA pending', link: 'https://amazon.jobs', createdAt: new Date().toISOString() },
        { id: '4', company: 'Flipkart', role: 'React Developer Intern', date: '2023-12-01', status: 'rejected', notes: 'Resume shortlisted', link: '', createdAt: new Date().toISOString() },
        { id: '5', company: 'Razorpay', role: 'Frontend Intern', date: '2024-02-01', status: 'wishlist', notes: 'Dream company', link: 'https://razorpay.com/jobs', createdAt: new Date().toISOString() }
      ]
      setInternships(seedData)
      localStorage.setItem(LOCAL_STORAGE_KEYS.INTERNSHIPS, JSON.stringify(seedData))
    }
  }, [])

  const save = useCallback((data) => {
    setInternships(data)
    localStorage.setItem(LOCAL_STORAGE_KEYS.INTERNSHIPS, JSON.stringify(data))
  }, [])

  const addInternship = useCallback((data) => {
    const newItem = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() }
    save([...internships, newItem])
    return newItem
  }, [internships, save])

  const updateInternship = useCallback((id, data) => {
    const updated = internships.map(i => i.id === id ? { ...i, ...data, updatedAt: new Date().toISOString() } : i)
    save(updated)
  }, [internships, save])

  const deleteInternship = useCallback((id) => {
    save(internships.filter(i => i.id !== id))
  }, [internships, save])

  const getStats = useCallback(() => {
    const stats = {}
    internships.forEach(i => { stats[i.status] = (stats[i.status] || 0) + 1 })
    return {
      total: internships.length,
      wishlist: stats.wishlist || 0,
      applied: stats.applied || 0,
      assessment: stats.assessment || 0,
      interview: stats.interview || 0,
      offer: stats.offer || 0,
      rejected: stats.rejected || 0
    }
  }, [internships])

  return (
    <InternshipContext.Provider value={{
      internships, addInternship, updateInternship, deleteInternship, getStats
    }}>
      {children}
    </InternshipContext.Provider>
  )
}

export const useInternship = () => {
  const ctx = useContext(InternshipContext)
  if (!ctx) throw new Error('useInternship must be used within InternshipProvider')
  return ctx
}
