import { useState } from 'react'
import { motion } from 'framer-motion'
import { Map, List, Clock, CheckCircle, Circle, ChevronDown, ChevronUp, ExternalLink, BookOpen, Play, GraduationCap, Globe } from 'lucide-react'
import { useRoadmap } from '../context/RoadmapContext'
import { useNavigate } from 'react-router-dom'
import { MILESTONE_STATUS, DIFFICULTY_COLORS } from '../constants'
import { toast } from 'react-toastify'
import styles from './Roadmap.module.css'

const VIEWS = [
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'list', label: 'List', icon: List },
]

const RESOURCE_ICONS = { docs: BookOpen, course: GraduationCap, youtube: Play, platform: Globe }

const Roadmap = () => {
  const { activeRoadmap, milestoneStatus, milestoneNotes, milestoneDeadlines,
    updateMilestoneStatus, updateMilestoneNote, updateMilestoneDeadline, getProgress } = useRoadmap()
  const navigate = useNavigate()
  const [view, setView] = useState('timeline')
  const [expanded, setExpanded] = useState(null)

  if (!activeRoadmap) {
    return (
      <div className={styles.page}>
        <div className="empty-state">
          <div className="empty-state-icon"><Map size={32} /></div>
          <h2>No Roadmap Yet</h2>
          <p>Complete onboarding to generate your personalized career roadmap.</p>
          <button className="btn btn-primary" onClick={() => navigate('/onboarding')}>
            Start Onboarding
          </button>
        </div>
      </div>
    )
  }

  const progress = getProgress(activeRoadmap.id)
  const months = [...new Set(activeRoadmap.milestones.map(m => m.month))].sort((a, b) => a - b)

  const handleToggle = (milestoneId) => {
    const current = milestoneStatus[milestoneId] || 'todo'
    const next = current === 'todo' ? 'in_progress' : current === 'in_progress' ? 'completed' : 'todo'
    updateMilestoneStatus(milestoneId, next)
    if (next === 'completed') {
      toast.success('Milestone completed! 🎉')
    }
  }

  const StatusIcon = ({ status }) => {
    if (status === 'completed') return <CheckCircle size={18} color="var(--color-success)" />
    if (status === 'in_progress') return <Circle size={18} color="var(--color-warning)" fill="var(--color-warning)" />
    return <Circle size={18} color="var(--text-muted)" />
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{activeRoadmap.role} Roadmap</h1>
          <p className={styles.subtitle}>{activeRoadmap.description}</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.progressBadge}>
            <span className={styles.progressNum}>{progress}%</span>
            <span className={styles.progressLabel}>Complete</span>
          </div>
          <div className="tabs">
            {VIEWS.map(v => (
              <button
                key={v.id}
                className={`tab ${view === v.id ? 'active' : ''}`}
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
              >
                <v.icon size={14} /> {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className={styles.progressBar}>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Timeline View */}
      {view === 'timeline' && (
        <div className={styles.timeline}>
          {months.map(month => {
            const monthMilestones = activeRoadmap.milestones.filter(m => m.month === month)
            return (
              <div key={month} className={styles.monthBlock}>
                <div className={styles.monthLabel}>Month {month}</div>
                <div className={styles.monthMilestones}>
                  {monthMilestones.map((m, idx) => (
                    <MilestoneCard
                      key={m.id}
                      milestone={m}
                      status={milestoneStatus[m.id] || 'todo'}
                      note={milestoneNotes[m.id] || ''}
                      deadline={milestoneDeadlines[m.id] || ''}
                      expanded={expanded === m.id}
                      onToggleExpand={() => setExpanded(expanded === m.id ? null : m.id)}
                      onToggleStatus={() => handleToggle(m.id)}
                      onNoteChange={note => updateMilestoneNote(m.id, note)}
                      onDeadlineChange={d => updateMilestoneDeadline(m.id, d)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className={styles.listView}>
          {activeRoadmap.milestones.map((m, i) => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              status={milestoneStatus[m.id] || 'todo'}
              note={milestoneNotes[m.id] || ''}
              deadline={milestoneDeadlines[m.id] || ''}
              expanded={expanded === m.id}
              onToggleExpand={() => setExpanded(expanded === m.id ? null : m.id)}
              onToggleStatus={() => handleToggle(m.id)}
              onNoteChange={note => updateMilestoneNote(m.id, note)}
              onDeadlineChange={d => updateMilestoneDeadline(m.id, d)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const MilestoneCard = ({ milestone, status, note, deadline, expanded, onToggleExpand, onToggleStatus, onNoteChange, onDeadlineChange }) => {
  const diffColor = { Beginner: 'green', Intermediate: 'yellow', Advanced: 'red' }[milestone.difficulty]

  return (
    <motion.div
      className={`${styles.milestoneCard} ${styles[status]}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Card header */}
      <div className={styles.cardHeader}>
        <button
          className={styles.statusBtn}
          onClick={onToggleStatus}
          aria-label={`Mark ${milestone.title} as ${status === 'todo' ? 'in progress' : status === 'in_progress' ? 'completed' : 'todo'}`}
        >
          {status === 'completed'
            ? <CheckCircle size={20} color="var(--color-success)" />
            : status === 'in_progress'
            ? <div className={styles.inProgressDot} />
            : <Circle size={20} color="var(--text-muted)" />
          }
        </button>

        <div className={styles.cardInfo} onClick={onToggleExpand} style={{ cursor: 'pointer', flex: 1 }}>
          <div className={styles.cardTitle}>
            <span className={styles.cardName}>{milestone.title}</span>
            <div className={styles.cardMeta}>
              <span className={`badge badge-${diffColor}`}>{milestone.difficulty}</span>
              <span className="badge badge-gray"><Clock size={11} /> {milestone.duration}</span>
            </div>
          </div>
        </div>

        <button className={styles.expandBtn} onClick={onToggleExpand} aria-label={expanded ? 'Collapse' : 'Expand'}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <motion.div
          className={styles.cardBody}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className={styles.desc}>{milestone.description}</p>

          {/* Deadline */}
          <div className={styles.deadlineRow}>
            <label className="form-label" htmlFor={`deadline-${milestone.id}`}>Deadline</label>
            <input
              id={`deadline-${milestone.id}`}
              type="date"
              className="form-input"
              value={deadline}
              onChange={e => onDeadlineChange(e.target.value)}
              style={{ maxWidth: 180 }}
            />
          </div>

          {/* Resources */}
          {milestone.resources?.length > 0 && (
            <div className={styles.resources}>
              <p className={styles.resourcesTitle}>Learning Resources</p>
              <div className={styles.resourceList}>
                {milestone.resources.map((r, i) => {
                  const Icon = RESOURCE_ICONS[r.type] || Globe
                  return (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceCard}
                    >
                      <Icon size={14} />
                      <span>{r.title}</span>
                      <ExternalLink size={12} className={styles.extIcon} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor={`note-${milestone.id}`}>Notes</label>
            <textarea
              id={`note-${milestone.id}`}
              className="form-input"
              rows={3}
              placeholder="Add your notes here..."
              value={note}
              onChange={e => onNoteChange(e.target.value)}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Roadmap
