import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Plus, X, Edit, Trash2, Flame, CheckCircle, AlertTriangle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useGoal } from '../context/GoalContext'
import { toast } from 'react-toastify'
import confetti from 'canvas-confetti'
import styles from './Goals.module.css'

const Goals = () => {
  const { goals, addGoal, updateGoal, deleteGoal, updateProgress, getStreak } = useGoal()
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const handleProgressUpdate = (goal, delta) => {
    const newProgress = Math.min(goal.target, Math.max(0, (goal.progress || 0) + delta))
    const wasCompleted = goal.progress >= goal.target
    const isNowCompleted = newProgress >= goal.target

    updateProgress(goal.id, newProgress)

    if (isNowCompleted && !wasCompleted) {
      toast.success(`🎉 Goal "${goal.title}" completed!`)
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } })
    }
  }

  const handleEdit = (goal) => {
    setEditItem(goal)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const categoryColors = {
    Learning: '#2563EB', DSA: '#7C3AED', Portfolio: '#059669', Career: '#D97706', Other: '#94A3B8'
  }

  const completedGoals = goals.filter(g => g.progress >= g.target)
  const activeGoals = goals.filter(g => g.progress < g.target)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Goal Tracker</h1>
          <p className={styles.subtitle}>Set goals, track progress, and celebrate wins</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.headerStat}>
            <span className={styles.statNum}>{goals.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.headerStat}>
            <span className={styles.statNum} style={{ color: 'var(--color-success)' }}>{completedGoals.length}</span>
            <span className={styles.statLabel}>Done</span>
          </div>
          <button className="btn btn-primary" onClick={handleAdd} id="add-goal-btn">
            <Plus size={16} /> Add Goal
          </button>
        </div>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Active Goals ({activeGoals.length})</h2>
          <div className={styles.goalsGrid}>
            <AnimatePresence>
              {activeGoals.map((goal, i) => {
                const pct = Math.min(100, Math.round((goal.progress / goal.target) * 100))
                const streak = getStreak(goal.id)
                const isDeadlineSoon = goal.deadline && new Date(goal.deadline) - new Date() < 7 * 86400000
                const catColor = categoryColors[goal.category] || '#94A3B8'

                return (
                  <motion.div
                    key={goal.id}
                    className={styles.goalCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.07 }}
                    layout
                  >
                    <div className={styles.goalTop}>
                      <div className={styles.goalCategory} style={{ color: catColor, background: `${catColor}18` }}>
                        {goal.category || 'Goal'}
                      </div>
                      <div className={styles.goalActions}>
                        {streak > 0 && (
                          <span className={styles.streak}><Flame size={13} /> {streak}</span>
                        )}
                        {isDeadlineSoon && (
                          <span className={styles.deadline}><AlertTriangle size={13} /> Soon</span>
                        )}
                        <button className={styles.iconBtn} onClick={() => handleEdit(goal)} aria-label="Edit goal">
                          <Edit size={14} />
                        </button>
                        <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => { deleteGoal(goal.id); toast.info('Goal removed') }} aria-label="Delete goal">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className={styles.goalTitle}>{goal.title}</h3>
                    {goal.description && <p className={styles.goalDesc}>{goal.description}</p>}

                    <div className={styles.progressSection}>
                      <div className={styles.progressInfo}>
                        <span className={styles.progressText}>{goal.progress} / {goal.target} {goal.unit}</span>
                        <span className={styles.progressPct}>{pct}%</span>
                      </div>
                      <div className="progress-bar" style={{ height: 8 }}>
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    <div className={styles.goalControls}>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleProgressUpdate(goal, -1)}>
                        −
                      </button>
                      <span className={styles.currentVal}>{goal.progress}</span>
                      <button className="btn btn-primary btn-sm" onClick={() => handleProgressUpdate(goal, 1)}>
                        +
                      </button>
                    </div>

                    {goal.deadline && (
                      <p className={styles.deadlineText}>Due: {goal.deadline}</p>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Completed 🎉 ({completedGoals.length})</h2>
          <div className={styles.completedList}>
            {completedGoals.map(goal => (
              <div key={goal.id} className={styles.completedItem}>
                <CheckCircle size={16} color="var(--color-success)" />
                <span>{goal.title}</span>
                <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => deleteGoal(goal.id)}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {goals.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon"><Target size={32} /></div>
          <h2>No Goals Yet</h2>
          <p>Set your first goal to start tracking your progress.</p>
          <button className="btn btn-primary" onClick={handleAdd}>Add Your First Goal</button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <GoalModal
            item={editItem}
            onClose={() => setModalOpen(false)}
            onSave={(data) => {
              if (editItem) {
                updateGoal(editItem.id, data)
                toast.success('Goal updated!')
              } else {
                addGoal(data)
                toast.success('Goal added!')
              }
              setModalOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const GoalModal = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: item || { title: '', description: '', target: 100, unit: '%', deadline: '', category: 'Learning', reminder: false }
  })

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="modal">
        <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
          <div className="modal-header">
            <h2 className="heading-sm">{item ? 'Edit Goal' : 'Add Goal'}</h2>
            <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit(onSave)}>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Goal Title *</label>
                <input className={`form-input ${errors.title ? 'error' : ''}`} {...register('title', { required: true })} placeholder="Complete React Course" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={2} {...register('description')} placeholder="Optional description..." style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div className="form-group">
                  <label className="form-label">Target *</label>
                  <input type="number" className={`form-input ${errors.target ? 'error' : ''}`} {...register('target', { required: true, min: 1 })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input className="form-input" {...register('unit')} placeholder="%, problems, etc." />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" {...register('category')}>
                    {['Learning', 'DSA', 'Portfolio', 'Career', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Deadline</label>
                  <input type="date" className="form-input" {...register('deadline')} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" id="save-goal-btn">{item ? 'Save Changes' : 'Add Goal'}</button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  )
}

export default Goals
