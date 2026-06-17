import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants'

const GoalContext = createContext(null)

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([])
  const [streaks, setStreaks] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.GOALS)
    if (saved) {
      const parsed = JSON.parse(saved)
      setGoals(parsed.goals || [])
      setStreaks(parsed.streaks || {})
    } else {
      const seedGoals = [
        { id: '1', title: 'Complete React Course', description: 'Finish all modules of Scrimba React course', progress: 65, target: 100, unit: '%', deadline: '2024-03-31', category: 'Learning', reminder: true, createdAt: new Date().toISOString() },
        { id: '2', title: 'Solve 100 LeetCode Problems', description: 'Focus on arrays, strings, and trees', progress: 34, target: 100, unit: 'problems', deadline: '2024-04-30', category: 'DSA', reminder: false, createdAt: new Date().toISOString() },
        { id: '3', title: 'Build Portfolio Website', description: 'Create a stunning portfolio to showcase projects', progress: 0, target: 1, unit: 'project', deadline: '2024-03-15', category: 'Portfolio', reminder: true, createdAt: new Date().toISOString() }
      ]
      setGoals(seedGoals)
      localStorage.setItem(LOCAL_STORAGE_KEYS.GOALS, JSON.stringify({ goals: seedGoals, streaks: {} }))
    }
  }, [])

  const save = useCallback((newGoals, newStreaks) => {
    setGoals(newGoals)
    setStreaks(newStreaks)
    localStorage.setItem(LOCAL_STORAGE_KEYS.GOALS, JSON.stringify({ goals: newGoals, streaks: newStreaks }))
  }, [])

  const addGoal = useCallback((data) => {
    const newGoal = { ...data, id: Date.now().toString(), progress: 0, createdAt: new Date().toISOString() }
    save([...goals, newGoal], streaks)
    return newGoal
  }, [goals, streaks, save])

  const updateGoal = useCallback((id, data) => {
    const updated = goals.map(g => g.id === id ? { ...g, ...data, updatedAt: new Date().toISOString() } : g)
    save(updated, streaks)
  }, [goals, streaks, save])

  const deleteGoal = useCallback((id) => {
    save(goals.filter(g => g.id !== id), streaks)
  }, [goals, streaks, save])

  const updateProgress = useCallback((id, progress) => {
    const goal = goals.find(g => g.id === id)
    if (!goal) return

    const completed = progress >= goal.target
    const updated = goals.map(g => g.id === id
      ? { ...g, progress, completed, completedAt: completed ? new Date().toISOString() : undefined }
      : g
    )

    // Update streak
    const today = new Date().toDateString()
    const newStreaks = {
      ...streaks,
      [id]: {
        ...(streaks[id] || {}),
        lastActive: today,
        count: (streaks[id]?.lastActive === new Date(Date.now() - 86400000).toDateString())
          ? (streaks[id]?.count || 0) + 1
          : (streaks[id]?.lastActive === today ? streaks[id]?.count || 1 : 1)
      }
    }

    save(updated, newStreaks)
    return completed
  }, [goals, streaks, save])

  const getStreak = useCallback((id) => {
    return streaks[id]?.count || 0
  }, [streaks])

  return (
    <GoalContext.Provider value={{
      goals, streaks,
      addGoal, updateGoal, deleteGoal, updateProgress, getStreak
    }}>
      {children}
    </GoalContext.Provider>
  )
}

export const useGoal = () => {
  const ctx = useContext(GoalContext)
  if (!ctx) throw new Error('useGoal must be used within GoalProvider')
  return ctx
}
