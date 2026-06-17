import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, ChevronDown, ChevronUp, Zap, Brain, TrendingUp, BookOpen, Star, Target } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AI_RECOMMENDATION_PROMPTS } from '../constants'
import { toast } from 'react-toastify'
import styles from './Recommendations.module.css'

const MOCK_RECOMMENDATIONS = {
  strengths: [
    'Strong foundation in JavaScript and React',
    'Active learner with consistent study habits',
    'Good at building projects and practical applications',
    'Demonstrates initiative through portfolio development'
  ],
  weaknesses: [
    'Limited experience with Data Structures & Algorithms',
    'Backend knowledge needs strengthening',
    'System design concepts not yet covered',
    'Limited open-source contributions'
  ],
  skillsToImprove: [
    'TypeScript — adds type safety to your React projects',
    'Node.js & REST APIs — for full-stack capability',
    'DSA — critical for technical interviews at top companies',
    'Testing (Jest/React Testing Library)',
    'CI/CD and deployment workflows'
  ],
  learningStrategy: 'Focus on depth over breadth. Spend the first month mastering one skill completely before moving to the next. Build small projects for every concept learned — this accelerates retention by 3x. Pair your learning with LeetCode practice (2–3 problems/day) to build algorithmic thinking.',
  interviewTips: [
    'Practice STAR format answers for behavioral rounds',
    'Solve 5 LeetCode problems per week (Easy → Medium)',
    'Build 2–3 solid portfolio projects with live demos',
    'Record mock interviews to improve communication',
    'Research company values and recent news before interviews',
    'Prepare questions to ask interviewers'
  ],
  internshipAdvice: 'Start applying 3–4 months before your target start date. Focus on companies with strong engineering cultures like startups, fintech companies, and product-based firms. Tailor your resume for each application. Your projects are your strongest differentiator — make sure they\'re polished and live.',
  weeklyFocus: [
    'Week 1–2: Complete a TypeScript crash course and migrate one existing project',
    'Week 3–4: Build a full-stack project with Node.js, Express, and MongoDB',
    'Week 5–6: DSA — Arrays, Strings, Linked Lists (solve 20+ problems)',
    'Week 7–8: System design basics + prepare for behavioral interviews'
  ]
}

const Recommendations = () => {
  const { user } = useAuth()
  const [recs, setRecs] = useState(MOCK_RECOMMENDATIONS)
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [mode, setMode] = useState('mock')
  const [expanded, setExpanded] = useState({})

  const profile = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('careercanvas_onboarding') || '{}') } catch { return {} }
  }, [])

  const generate = async () => {
    setLoading(true)
    try {
      if (mode === 'mock') {
        await new Promise(r => setTimeout(r, 1200))
        setRecs({ ...MOCK_RECOMMENDATIONS })
        toast.success('Recommendations generated! ✨')
      } else if (mode === 'gemini' && apiKey) {
        const prompt = AI_RECOMMENDATION_PROMPTS.career({ ...profile, name: user?.name })
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        })
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const parsed = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || '{}')
        if (parsed.strengths) { setRecs(parsed); toast.success('AI analysis complete!') }
        else toast.error('Failed to parse AI response')
      }
    } catch (err) {
      toast.error('Failed to generate. Check your API key.')
      console.error(err)
    }
    setLoading(false)
  }

  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }))

  const sections = [
    { key: 'strengths', icon: Star, title: 'Your Strengths', color: '#22C55E', items: recs.strengths },
    { key: 'weaknesses', icon: Target, title: 'Areas to Improve', color: '#F59E0B', items: recs.weaknesses },
    { key: 'skillsToImprove', icon: TrendingUp, title: 'Skills to Learn', color: '#2563EB', items: recs.skillsToImprove },
    { key: 'interviewTips', icon: Brain, title: 'Interview Preparation', color: '#7C3AED', items: recs.interviewTips },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Career Insights</h1>
          <p className={styles.subtitle}>Get personalized recommendations from your AI career mentor</p>
        </div>

        <div className={styles.controls}>
          <div className="tabs">
            {[
              { id: 'mock', label: 'Mock AI' },
              { id: 'gemini', label: 'Gemini' },
            ].map(m => (
              <button key={m.id} className={`tab ${mode === m.id ? 'active' : ''}`} onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </div>

          {(mode === 'gemini') && (
            <input
              type="password"
              className="form-input"
              placeholder={`${mode === 'gemini' ? 'Gemini' : 'OpenAI'} API Key`}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              style={{ maxWidth: 220 }}
            />
          )}

          <button className="btn btn-primary" onClick={generate} disabled={loading} id="generate-insights-btn">
            {loading ? <span className={styles.spinner} /> : <><RefreshCw size={15} /> Generate</>}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Four list sections */}
        {sections.map((s, i) => (
          <motion.div
            key={s.key}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button className={styles.cardHeader} onClick={() => toggle(s.key)} aria-expanded={expanded[s.key]}>
              <div className={styles.cardTitleRow}>
                <div className={styles.cardIcon} style={{ background: `${s.color}18`, color: s.color }}>
                  <s.icon size={18} />
                </div>
                <span className={styles.cardTitle}>{s.title}</span>
                <span className={styles.cardCount}>{s.items?.length || 0}</span>
              </div>
              {expanded[s.key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {expanded[s.key] !== false && (
                <motion.ul
                  className={styles.list}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {s.items?.map((item, j) => (
                    <motion.li
                      key={j}
                      className={styles.listItem}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                    >
                      <div className={styles.bullet} style={{ background: s.color }} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Learning Strategy — full width */}
        <motion.div
          className={`${styles.card} ${styles.fullWidth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.cardHeader} style={{ cursor: 'default' }}>
            <div className={styles.cardTitleRow}>
              <div className={styles.cardIcon} style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}>
                <BookOpen size={18} />
              </div>
              <span className={styles.cardTitle}>Learning Strategy</span>
            </div>
          </div>
          <p className={styles.strategyText}>{recs.learningStrategy}</p>
        </motion.div>

        {/* Internship Advice */}
        <motion.div
          className={`${styles.card} ${styles.fullWidth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className={styles.cardHeader} style={{ cursor: 'default' }}>
            <div className={styles.cardTitleRow}>
              <div className={styles.cardIcon} style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                <Zap size={18} />
              </div>
              <span className={styles.cardTitle}>Internship Advice</span>
            </div>
          </div>
          <p className={styles.strategyText}>{recs.internshipAdvice}</p>
        </motion.div>

        {/* Weekly Focus */}
        <motion.div
          className={`${styles.card} ${styles.fullWidth}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.cardHeader} style={{ cursor: 'default' }}>
            <div className={styles.cardTitleRow}>
              <div className={styles.cardIcon} style={{ background: 'rgba(139,92,246,0.12)', color: '#7C3AED' }}>
                <Sparkles size={18} />
              </div>
              <span className={styles.cardTitle}>Weekly Focus Plan</span>
            </div>
          </div>
          <div className={styles.weeklyGrid}>
            {recs.weeklyFocus?.map((w, i) => (
              <div key={i} className={styles.weekCard}>
                <span className={styles.weekNum}>Week {i * 2 + 1}–{i * 2 + 2}</span>
                <p className={styles.weekFocus}>{w.replace(/Week \d+.*?: /, '')}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Recommendations
