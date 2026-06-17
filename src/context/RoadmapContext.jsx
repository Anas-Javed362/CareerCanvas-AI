import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LOCAL_STORAGE_KEYS, MILESTONE_STATUS } from '../constants'
import { ROADMAP_TEMPLATES } from '../data/roadmaps'

const RoadmapContext = createContext(null)

export const RoadmapProvider = ({ children }) => {
  const [roadmaps, setRoadmaps] = useState([])
  const [milestoneStatus, setMilestoneStatus] = useState({})
  const [milestoneNotes, setMilestoneNotes] = useState({})
  const [milestoneDeadlines, setMilestoneDeadlines] = useState({})

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ROADMAPS)
    const savedMilestones = localStorage.getItem(LOCAL_STORAGE_KEYS.MILESTONES)
    if (saved) setRoadmaps(JSON.parse(saved))
    if (savedMilestones) {
      const data = JSON.parse(savedMilestones)
      setMilestoneStatus(data.status || {})
      setMilestoneNotes(data.notes || {})
      setMilestoneDeadlines(data.deadlines || {})
    }
  }, [])

  const saveRoadmaps = useCallback((data) => {
    setRoadmaps(data)
    localStorage.setItem(LOCAL_STORAGE_KEYS.ROADMAPS, JSON.stringify(data))
  }, [])

  const saveMilestones = useCallback((status, notes, deadlines) => {
    const data = { status, notes, deadlines }
    localStorage.setItem(LOCAL_STORAGE_KEYS.MILESTONES, JSON.stringify(data))
  }, [])

  const generateRoadmap = useCallback((profile) => {
    const template = ROADMAP_TEMPLATES[profile.targetRole]
    if (!template) return null

    const roadmap = {
      id: Date.now().toString(),
      userId: profile.userId,
      role: profile.targetRole,
      profile,
      color: template.color,
      icon: template.icon,
      description: template.description,
      milestones: template.milestones.map((m, idx) => ({
        ...m,
        id: m.id + '-' + Date.now(),
        order: idx,
        month: Math.ceil((idx + 1) / 2)
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const newRoadmaps = [...roadmaps.filter(r => r.id !== roadmap.id), roadmap]
    saveRoadmaps(newRoadmaps)
    return roadmap
  }, [roadmaps, saveRoadmaps])

  const updateMilestoneStatus = useCallback((milestoneId, status) => {
    const newStatus = { ...milestoneStatus, [milestoneId]: status }
    setMilestoneStatus(newStatus)
    saveMilestones(newStatus, milestoneNotes, milestoneDeadlines)
  }, [milestoneStatus, milestoneNotes, milestoneDeadlines, saveMilestones])

  const updateMilestoneNote = useCallback((milestoneId, note) => {
    const newNotes = { ...milestoneNotes, [milestoneId]: note }
    setMilestoneNotes(newNotes)
    saveMilestones(milestoneStatus, newNotes, milestoneDeadlines)
  }, [milestoneStatus, milestoneNotes, milestoneDeadlines, saveMilestones])

  const updateMilestoneDeadline = useCallback((milestoneId, deadline) => {
    const newDeadlines = { ...milestoneDeadlines, [milestoneId]: deadline }
    setMilestoneDeadlines(newDeadlines)
    saveMilestones(milestoneStatus, milestoneNotes, newDeadlines)
  }, [milestoneStatus, milestoneNotes, milestoneDeadlines, saveMilestones])

  const reorderMilestones = useCallback((roadmapId, newOrder) => {
    const updated = roadmaps.map(r => {
      if (r.id === roadmapId) {
        return { ...r, milestones: newOrder, updatedAt: new Date().toISOString() }
      }
      return r
    })
    saveRoadmaps(updated)
  }, [roadmaps, saveRoadmaps])

  const getProgress = useCallback((roadmapId) => {
    const roadmap = roadmaps.find(r => r.id === roadmapId)
    if (!roadmap) return 0
    const total = roadmap.milestones.length
    if (!total) return 0
    const completed = roadmap.milestones.filter(m =>
      milestoneStatus[m.id] === MILESTONE_STATUS.COMPLETED
    ).length
    return Math.round((completed / total) * 100)
  }, [roadmaps, milestoneStatus])

  const activeRoadmap = roadmaps[roadmaps.length - 1] || null

  return (
    <RoadmapContext.Provider value={{
      roadmaps, activeRoadmap,
      milestoneStatus, milestoneNotes, milestoneDeadlines,
      generateRoadmap, updateMilestoneStatus,
      updateMilestoneNote, updateMilestoneDeadline,
      reorderMilestones, getProgress
    }}>
      {children}
    </RoadmapContext.Provider>
  )
}

export const useRoadmap = () => {
  const ctx = useContext(RoadmapContext)
  if (!ctx) throw new Error('useRoadmap must be used within RoadmapProvider')
  return ctx
}
