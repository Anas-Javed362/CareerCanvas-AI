const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const User = require('../models/User')

router.use(protect)

// GET /api/recommendations — returns a personalized career insights payload
// This is a rule-based engine that works without an external AI API key.
// When you add an OpenAI/Gemini key to .env, replace generateInsights() with an LLM call.
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const profile = user.profile || {}
    const insights = generateInsights(profile)

    res.json({ recommendations: insights, generatedAt: new Date().toISOString() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/recommendations/generate — accepts a profile body and returns fresh insights
router.post('/generate', async (req, res) => {
  try {
    const profile = req.body.profile || {}
    const insights = generateInsights(profile)
    res.json({ recommendations: insights, generatedAt: new Date().toISOString() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Rule-based insights engine ────────────────────────────────────────────────
function generateInsights(profile) {
  const skills = profile.skills || []
  const interests = profile.interests || []
  const targetRole = profile.targetRole || 'Software Engineer'
  const year = profile.year || '2nd Year'

  // Strengths
  const strengths = []
  if (skills.length >= 5) strengths.push('Diverse skill portfolio shows broad technical curiosity')
  if (skills.includes('React') || skills.includes('Vue.js') || skills.includes('Angular'))
    strengths.push('Strong frontend framework knowledge — highly sought by product companies')
  if (skills.includes('Python') || skills.includes('Machine Learning'))
    strengths.push('Python/ML skills are among the most in-demand in the industry')
  if (skills.includes('Docker') || skills.includes('Kubernetes'))
    strengths.push('Cloud/DevOps awareness gives you an edge in modern engineering roles')
  if (skills.includes('SQL') || skills.includes('MongoDB'))
    strengths.push('Database proficiency is fundamental and valued across all roles')
  if (strengths.length === 0)
    strengths.push('Early stage — every new skill you add multiplies your opportunities')

  // Weaknesses / improvement areas
  const weaknesses = []
  if (!skills.includes('DSA') && !skills.includes('System Design'))
    weaknesses.push('Core CS fundamentals (DSA & System Design) — critical for top-tier interviews')
  if (!skills.includes('Git'))
    weaknesses.push('Version control (Git/GitHub) is a baseline expectation for any dev role')
  if (interests.includes('AI & Machine Learning') && !skills.includes('Python'))
    weaknesses.push('Add Python to pursue ML/AI interests effectively')
  if (weaknesses.length === 0)
    weaknesses.push('Keep benchmarking against job descriptions to spot hidden gaps')

  // Skills to improve
  const skillsToImprove = []
  if (!skills.includes('DSA')) skillsToImprove.push('Data Structures & Algorithms')
  if (!skills.includes('System Design')) skillsToImprove.push('System Design fundamentals')
  if (targetRole.includes('Frontend') && !skills.includes('TypeScript'))
    skillsToImprove.push('TypeScript — now standard on frontend teams')
  if (targetRole.includes('Data') && !skills.includes('Power BI') && !skills.includes('Tableau'))
    skillsToImprove.push('BI tools (Power BI or Tableau) for data analyst roles')
  if (skillsToImprove.length === 0) skillsToImprove.push('Advanced system design patterns')

  // Learning strategy
  const learningStrategy = `As a ${year} student targeting ${targetRole}, focus on building project-based evidence of your skills rather than just accumulating certificates. Aim for one deployed project per major skill — employers value working code over course completions. Dedicate 1–2 hours daily to DSA on LeetCode and use weekends for larger project work. Document everything on GitHub and write short LinkedIn posts about what you build to grow visibility.`

  // Interview tips
  const interviewTips = [
    'Master the STAR format (Situation, Task, Action, Result) for behavioral rounds',
    'Practice explaining your projects clearly: problem → your approach → outcome',
    'For technical rounds: think aloud, ask clarifying questions before coding',
    'Research each company\'s tech stack and mention it during interviews',
    'Prepare at least 3 thoughtful questions to ask the interviewer',
    'Mock interviews on Pramp or Interviewing.io build real-world confidence'
  ]

  // Internship advice
  const internshipAdvice = `For ${targetRole} roles, prioritize applications to companies where your top 2–3 skills overlap directly with their job description. Quality beats quantity — 20 targeted applications outperform 100 generic ones. Reach out to team members on LinkedIn 1–2 weeks after applying; a warm message often tips a borderline resume into an interview. Track every application in your CareerCanvas internship tracker to avoid follow-up misses.`

  // Weekly focus plan
  const weeklyFocus = [
    'Week 1: Audit your GitHub — polish 2 existing projects with good READMEs and live demos',
    'Week 2: Solve 15 LeetCode Easy/Medium problems in your target language',
    'Week 3: Apply to 10 targeted internships; connect with 5 alumni at those companies',
    'Week 4: Complete one mock interview and refine your resume based on feedback'
  ]

  return {
    strengths,
    weaknesses,
    skillsToImprove,
    learningStrategy,
    interviewTips,
    internshipAdvice,
    weeklyFocus
  }
}

module.exports = router
