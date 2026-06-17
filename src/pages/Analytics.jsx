import { useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { motion } from 'framer-motion'
import { BarChart2 } from 'lucide-react'
import { useInternship } from '../context/InternshipContext'
import { useGoal } from '../context/GoalContext'
import { useRoadmap } from '../context/RoadmapContext'
import { INTERNSHIP_STATUSES, MILESTONE_STATUS } from '../constants'
import styles from './Analytics.module.css'

const COLORS = ['#2563EB', '#7C3AED', '#F59E0B', '#22C55E', '#EF4444', '#06B6D4']

const Analytics = () => {
  const { internships } = useInternship()
  const { goals } = useGoal()
  const { activeRoadmap, milestoneStatus } = useRoadmap()

  // Applications per month
  const appsByMonth = useMemo(() => {
    const counts = {}
    internships.forEach(i => {
      const month = i.date?.slice(0, 7) || 'Unknown'
      counts[month] = (counts[month] || 0) + 1
    })
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({ month: month.slice(5), count }))
  }, [internships])

  // Status breakdown
  const statusData = useMemo(() => {
    return INTERNSHIP_STATUSES.map(s => ({
      name: s.label,
      value: internships.filter(i => i.status === s.id).length,
      color: s.color
    })).filter(s => s.value > 0)
  }, [internships])

  // Milestone completion
  const milestoneData = useMemo(() => {
    if (!activeRoadmap) return []
    const total = activeRoadmap.milestones.length
    const completed = activeRoadmap.milestones.filter(m => milestoneStatus[m.id] === MILESTONE_STATUS.COMPLETED).length
    const inProgress = activeRoadmap.milestones.filter(m => milestoneStatus[m.id] === MILESTONE_STATUS.IN_PROGRESS).length
    return [
      { name: 'Completed', value: completed, color: '#22C55E' },
      { name: 'In Progress', value: inProgress, color: '#F59E0B' },
      { name: 'To Do', value: total - completed - inProgress, color: '#E2E8F0' }
    ]
  }, [activeRoadmap, milestoneStatus])

  // Goal progress
  const goalData = useMemo(() =>
    goals.slice(0, 5).map(g => ({
      name: g.title.slice(0, 20),
      progress: Math.min(100, Math.round((g.progress / g.target) * 100))
    }))
  , [goals])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics Dashboard</h1>
        <p className={styles.subtitle}>Visualize your career journey progress</p>
      </div>

      {/* Summary cards */}
      <div className={styles.summaryGrid}>
        {[
          { label: 'Total Applications', value: internships.length, color: '#2563EB' },
          { label: 'Interviews', value: internships.filter(i => i.status === 'interview').length, color: '#7C3AED' },
          { label: 'Offers', value: internships.filter(i => i.status === 'offer').length, color: '#22C55E' },
          { label: 'Goals Completed', value: goals.filter(g => g.progress >= g.target).length, color: '#F59E0B' },
        ].map((c, i) => (
          <motion.div key={c.label} className={styles.summaryCard} custom={i} variants={cardVariants} initial="hidden" animate="visible">
            <span className={styles.summaryVal} style={{ color: c.color }}>{c.value}</span>
            <span className={styles.summaryLabel}>{c.label}</span>
          </motion.div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        {/* Applications per month */}
        <motion.div className={styles.chartCard} custom={4} variants={cardVariants} initial="hidden" animate="visible">
          <h2 className={styles.chartTitle}>Applications per Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={appsByMonth} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
              />
              <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status breakdown */}
        <motion.div className={styles.chartCard} custom={5} variants={cardVariants} initial="hidden" animate="visible">
          <h2 className={styles.chartTitle}>Application Status</h2>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
              <p className="text-muted text-sm">No application data yet</p>
            </div>
          )}
        </motion.div>

        {/* Milestone completion */}
        <motion.div className={styles.chartCard} custom={6} variants={cardVariants} initial="hidden" animate="visible">
          <h2 className={styles.chartTitle}>Milestone Progress</h2>
          {milestoneData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={milestoneData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {milestoneData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
              <p className="text-muted text-sm">Generate a roadmap first</p>
            </div>
          )}
        </motion.div>

        {/* Goal progress */}
        <motion.div className={styles.chartCard} custom={7} variants={cardVariants} initial="hidden" animate="visible">
          <h2 className={styles.chartTitle}>Goal Progress (%)</h2>
          {goalData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={goalData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} width={100} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8 }}
                  formatter={v => [`${v}%`, 'Progress']}
                />
                <Bar dataKey="progress" fill="#06B6D4" radius={[0, 6, 6, 0]} name="Progress" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
              <p className="text-muted text-sm">No goals tracked yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
