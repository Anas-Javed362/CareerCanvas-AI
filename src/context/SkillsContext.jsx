import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LOCAL_STORAGE_KEYS, SKILLS_RADAR_DEFAULTS } from '../constants'

const SkillsContext = createContext(null)

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState(SKILLS_RADAR_DEFAULTS)
  const [skillHistory, setSkillHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SKILLS)
    if (saved) {
      const data = JSON.parse(saved)
      setSkills(data.current || SKILLS_RADAR_DEFAULTS)
      setSkillHistory(data.history || [])
    }
  }, [])

  const updateSkill = useCallback((name, value) => {
    const newSkills = { ...skills, [name]: value }
    const snapshot = { date: new Date().toISOString(), skills: newSkills }
    const newHistory = [...skillHistory.slice(-11), snapshot]
    setSkills(newSkills)
    setSkillHistory(newHistory)
    localStorage.setItem(LOCAL_STORAGE_KEYS.SKILLS, JSON.stringify({ current: newSkills, history: newHistory }))
  }, [skills, skillHistory])

  const updateAllSkills = useCallback((newSkills) => {
    const snapshot = { date: new Date().toISOString(), skills: newSkills }
    const newHistory = [...skillHistory.slice(-11), snapshot]
    setSkills(newSkills)
    setSkillHistory(newHistory)
    localStorage.setItem(LOCAL_STORAGE_KEYS.SKILLS, JSON.stringify({ current: newSkills, history: newHistory }))
  }, [skillHistory])

  return (
    <SkillsContext.Provider value={{ skills, skillHistory, updateSkill, updateAllSkills }}>
      {children}
    </SkillsContext.Provider>
  )
}

export const useSkills = () => {
  const ctx = useContext(SkillsContext)
  if (!ctx) throw new Error('useSkills must be used within SkillsProvider')
  return ctx
}
