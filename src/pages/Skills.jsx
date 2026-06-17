import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'
import { motion } from 'framer-motion'
import { Activity, Download } from 'lucide-react'
import { useSkills } from '../context/SkillsContext'
import { toast } from 'react-toastify'
import html2canvas from 'html2canvas'
import styles from './Skills.module.css'

const Skills = () => {
  const { skills, updateSkill } = useSkills()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const radarData = Object.entries(skills).map(([name, value]) => ({ skill: name, value, fullMark: 100 }))

  const exportChart = async () => {
    try {
      const el = document.getElementById('skills-radar-chart')
      const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 })
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'skills-radar.png'
      a.click()
      toast.success('Chart exported as PNG!')
    } catch {
      toast.error('Export failed.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Skills Radar</h1>
          <p className={styles.subtitle}>Visualize and update your skill levels interactively</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={exportChart} id="export-radar-btn">
          <Download size={15} /> Export Chart
        </button>
      </div>

      <div className={styles.content}>
        {/* Radar Chart */}
        <div className={styles.chartSection} id="skills-radar-chart">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid gridType="polygon" stroke="var(--border-default)" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                axisLine={false}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.18}
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2563EB' }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 8,
                  fontSize: 13
                }}
                formatter={(v, name) => [`${v}/100`, 'Level']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills sliders */}
        <div className={styles.slidersSection}>
          <h2 className={styles.slidersTitle}>Adjust Your Skills</h2>
          <div className={styles.sliders}>
            {Object.entries(skills).map(([name, value]) => (
              <motion.div
                key={name}
                className={`${styles.sliderItem} ${hoveredSkill === name ? styles.hovered : ''}`}
                onMouseEnter={() => setHoveredSkill(name)}
                onMouseLeave={() => setHoveredSkill(null)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={styles.sliderHeader}>
                  <label htmlFor={`skill-${name}`} className={styles.skillName}>{name}</label>
                  <span className={styles.skillValue}>{value}</span>
                </div>
                <input
                  id={`skill-${name}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={value}
                  onChange={e => updateSkill(name, parseInt(e.target.value))}
                  className={styles.slider}
                  aria-label={`${name} skill level: ${value}`}
                />
                <div className={styles.sliderTrack}>
                  <motion.div
                    className={styles.sliderFill}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill level guide */}
      <div className={styles.guide}>
        {[
          { range: '0–25', label: 'Beginner', color: '#EF4444' },
          { range: '26–50', label: 'Developing', color: '#F59E0B' },
          { range: '51–75', label: 'Proficient', color: '#2563EB' },
          { range: '76–100', label: 'Expert', color: '#22C55E' }
        ].map(g => (
          <div key={g.range} className={styles.guideItem}>
            <div className={styles.guideDot} style={{ background: g.color }} />
            <span className={styles.guideRange}>{g.range}</span>
            <span className={styles.guideLabel}>{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
