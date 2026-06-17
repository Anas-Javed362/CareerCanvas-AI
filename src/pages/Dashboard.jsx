import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Target, Briefcase, CheckCircle, TrendingUp, ArrowRight,
  Map, KanbanSquare, Sparkles, Flame, Trophy, Calendar
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useRoadmap } from '../context/RoadmapContext'
import { useInternship } from '../context/InternshipContext'
import { useGoal } from '../context/GoalContext'
import { MILESTONE_STATUS } from '../constants'
import styles from './Dashboard.module.css'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] }
  })
}

const Dashboard = () => {
  const { user } = useAuth()
  const { activeRoadmap, milestoneStatus, getProgress } = useRoadmap()
  const { internships, getStats } = useInternship()
  const { goals } = useGoal()
  const navigate = useNavigate()

  const profile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('careercanvas_onboarding') || '{}')
    } catch { return {} }
  }, [])

  const progress = activeRoadmap ? getProgress(activeRoadmap.id) : 0

  const internshipStats = getStats()

  const completedGoals = goals.filter(g => g.completed || g.progress >= g.target).length

  const completedMilestones = activeRoadmap
    ? activeRoadmap.milestones.filter(m => milestoneStatus[m.id] === MILESTONE_STATUS.COMPLETED).length
    : 0

  const quickStats = [
    { icon: Map, label: 'Milestones Done', value: `${completedMilestones}/${activeRoadmap?.milestones?.length || 0}`, color: '#2563EB', path: '/roadmap' },
    { icon: Briefcase, label: 'Applications', value: internshipStats.total, color: '#7C3AED', path: '/internships' },
    { icon: CheckCircle, label: 'Interviews', value: internshipStats.interview, color: '#059669', path: '/internships' },
    { icon: Target, label: 'Goals Active', value: goals.length, color: '#D97706', path: '/goals' },
  ]

  const recentMilestones = activeRoadmap?.milestones?.slice(0, 5) || []

  return (
    <div className={styles.page}>
      {/* Welcome Header */}
      <section className={styles.welcomeSection}>
        <motion.div
          className={styles.welcomeContent}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.welcomeText}>
            <h1 className={styles.greeting}>
              Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
            </h1>
            {profile.targetRole && (
              <p className={styles.journeyLine}>
                Your journey to becoming a{' '}
                <strong>{profile.targetRole}</strong> starts here.
              </p>
            )}
          </div>

          {activeRoadmap && (
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Overall Progress</span>
                <span className={styles.progressValue}>{progress}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <p className={styles.progressSub}>
                {completedMilestones} of {activeRoadmap.milestones.length} milestones completed
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className={styles.statsGrid}>
        {quickStats.map((stat, i) => (
          <motion.button
            key={stat.label}
            className={styles.statCard}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate(stat.path)}
            whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
            style={{ '--stat-color': stat.color }}
          >
            <div className={styles.statIcon} style={{ background: `${stat.color}18`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <ArrowRight size={16} className={styles.statArrow} />
          </motion.button>
        ))}
      </section>

      {/* Main grid */}
      <div className={styles.mainGrid}>
        {/* Roadmap Preview */}
        <motion.div
          className={`${styles.panel} ${styles.roadmapPanel}`}
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <Map size={18} />
              <span>Career Roadmap</span>
              {activeRoadmap && (
                <span className="badge badge-blue">{activeRoadmap.role}</span>
              )}
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/roadmap')}>
              View All <ArrowRight size={14} />
            </button>
          </div>

          {activeRoadmap ? (
            <div className={styles.milestoneList}>
              {recentMilestones.map((m, i) => {
                const status = milestoneStatus[m.id] || 'todo'
                return (
                  <div key={m.id} className={styles.milestoneItem}>
                    <div className={`${styles.milestoneStatus} ${styles[status]}`}>
                      {status === 'completed' ? <CheckCircle size={14} /> : i + 1}
                    </div>
                    <div className={styles.milestoneInfo}>
                      <span className={styles.milestoneName}>{m.title}</span>
                      <span className={styles.milestoneDuration}>{m.duration}</span>
                    </div>
                    <span className={`badge badge-${status === 'completed' ? 'green' : status === 'in_progress' ? 'yellow' : 'gray'}`}>
                      {status === 'in_progress' ? 'In Progress' : status === 'completed' ? 'Done' : 'To Do'}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><Map size={28} /></div>
              <p>No roadmap yet. Complete onboarding to get started!</p>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/onboarding')}>
                Generate Roadmap
              </button>
            </div>
          )}
        </motion.div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Internship Tracker Summary */}
          <motion.div
            className={styles.panel}
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <Briefcase size={18} />
                <span>Internship Pipeline</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/internships')}>
                Manage <ArrowRight size={14} />
              </button>
            </div>

            <div className={styles.pipelineStats}>
              {[
                { label: 'Applied', val: internshipStats.applied, color: '#2563EB' },
                { label: 'Assessment', val: internshipStats.assessment, color: '#F59E0B' },
                { label: 'Interview', val: internshipStats.interview, color: '#7C3AED' },
                { label: 'Offer 🎉', val: internshipStats.offer, color: '#22C55E' },
              ].map(s => (
                <div key={s.label} className={styles.pipelineStat}>
                  <span className={styles.pipelineVal} style={{ color: s.color }}>{s.val}</span>
                  <span className={styles.pipelineLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Goals Summary */}
          <motion.div
            className={styles.panel}
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <Target size={18} />
                <span>Active Goals</span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/goals')}>
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className={styles.goalsList}>
              {goals.slice(0, 3).map(goal => {
                const pct = Math.min(100, Math.round((goal.progress / goal.target) * 100))
                return (
                  <div key={goal.id} className={styles.goalItem}>
                    <div className={styles.goalInfo}>
                      <span className={styles.goalName}>{goal.title}</span>
                      <span className={styles.goalPct}>{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
              {goals.length === 0 && (
                <div className="empty-state" style={{ padding: 'var(--space-6)' }}>
                  <p className="text-muted text-sm">No goals yet. Add your first goal!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className={styles.panel}
            custom={7}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <Sparkles size={18} />
                <span>Quick Actions</span>
              </div>
            </div>
            <div className={styles.quickActions}>
              {[
                { icon: KanbanSquare, label: 'Open Planner', path: '/planner', color: '#2563EB' },
                { icon: Sparkles, label: 'AI Insights', path: '/recommendations', color: '#7C3AED' },
                { icon: TrendingUp, label: 'View Analytics', path: '/analytics', color: '#059669' },
              ].map(a => (
                <button
                  key={a.label}
                  className={styles.quickActionBtn}
                  onClick={() => navigate(a.path)}
                  style={{ '--qa-color': a.color }}
                >
                  <a.icon size={16} style={{ color: a.color }} />
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
