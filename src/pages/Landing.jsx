import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, BarChart2, Target, Briefcase, Sparkles, CheckCircle, Star, Github } from 'lucide-react'
import styles from './Landing.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const FEATURES = [
  { icon: Target, title: 'Personalized Roadmaps', desc: 'AI-generated career paths tailored to your degree, skills, and dream role.' },
  { icon: Briefcase, title: 'Internship Tracker', desc: 'Track applications from wishlist to offer with smart status management.' },
  { icon: BarChart2, title: 'Skills Analytics', desc: 'Visualize your growth with interactive radar charts and progress metrics.' },
  { icon: Sparkles, title: 'AI Recommendations', desc: 'Get actionable insights from your personal AI career mentor.' },
]

const STATS = [
  { value: '10+', label: 'Career Paths' },
  { value: '100+', label: 'Curated Resources' },
  { value: '∞', label: 'Goals to Achieve' },
]

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}><Zap size={18} color="white" /></div>
          <span className={styles.navLogoText}>CareerCanvas <span className={styles.navLogoAi}>AI</span></span>
        </div>
        <div className={styles.navActions}>
          <button className="btn btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0} className={styles.badge}>
            <Sparkles size={14} />
            <span>AI-Powered Career Intelligence</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className={`${styles.heroTitle} heading-xl`}>
            Design Your Career
            <br />
            <span className="text-gradient">Journey with AI</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className={styles.heroSubtitle}>
            CareerCanvas AI helps you build personalized roadmaps, track internships,
            visualize skills, and receive intelligent recommendations — all in one place.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className={styles.heroCta}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/register')}
              id="cta-design-journey"
            >
              Design Your Career Journey
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/login')}
              id="cta-sign-in"
            >
              Sign In
            </button>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className={styles.heroTrust}>
            {['No credit card required', 'Free to use', 'Export anytime'].map(t => (
              <span key={t} className={styles.trustItem}>
                <CheckCircle size={14} />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <DashboardPreview />
        </motion.div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Features */}
      <section className={styles.features}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg">Everything you need to succeed</h2>
          <p className={styles.sectionSubtitle}>
            A complete career management platform built for ambitious students.
          </p>
        </motion.div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
            >
              <div className={styles.featureIcon}>
                <f.icon size={22} />
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaStar}>
            <Star size={20} fill="currentColor" />
          </div>
          <h2 className={`${styles.ctaTitle} heading-lg`}>
            Ready to map your future?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of students designing their career journeys with AI.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/register')}
            id="cta-get-started-bottom"
          >
            Get Started — It's Free
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <div className={styles.navLogoIcon}><Zap size={16} color="white" /></div>
          <span>CareerCanvas AI</span>
        </div>
        <p className={styles.footerText}>
          Built with ❤️ for ambitious students.
        </p>
        <div className={styles.footerLinks}>
          <button className={styles.footerLink} onClick={() => navigate('/login')}>Login</button>
          <button className={styles.footerLink} onClick={() => navigate('/register')}>Register</button>
        </div>
      </footer>
    </div>
  )
}

// Mini dashboard preview card
const DashboardPreview = () => (
  <div className={styles.previewCard}>
    <div className={styles.previewHeader}>
      <div className={styles.previewDots}>
        <span style={{background:'#EF4444'}} />
        <span style={{background:'#F59E0B'}} />
        <span style={{background:'#22C55E'}} />
      </div>
      <span className={styles.previewTitle}>CareerCanvas Dashboard</span>
    </div>
    <div className={styles.previewBody}>
      <div className={styles.previewWelcome}>
        <p className={styles.previewGreet}>Welcome back, Anas 👋</p>
        <p className={styles.previewRole}>Becoming a Frontend Developer</p>
        <div className={styles.previewProgress}>
          <div className={styles.previewProgressBar} />
          <span>67% complete</span>
        </div>
      </div>

      <div className={styles.previewMilestones}>
        {['Learn React', 'Build Portfolio', 'Apply for Internships'].map((m, i) => (
          <div key={m} className={styles.previewMilestone}>
            <div className={`${styles.previewDot} ${i === 0 ? styles.done : i === 1 ? styles.inprogress : ''}`} />
            <span>{m}</span>
          </div>
        ))}
      </div>

      <div className={styles.previewStats}>
        <div className={styles.previewStat}><span className={styles.previewStatVal}>12</span><span>Applied</span></div>
        <div className={styles.previewStat}><span className={styles.previewStatVal}>3</span><span>Interviews</span></div>
        <div className={styles.previewStat}><span className={styles.previewStatVal}>1</span><span>Offer</span></div>
      </div>
    </div>
  </div>
)

export default Landing
