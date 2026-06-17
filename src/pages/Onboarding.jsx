import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useRoadmap } from '../context/RoadmapContext'
import {
  DEGREE_OPTIONS, YEAR_OPTIONS, CAREER_ROLES,
  INDUSTRY_OPTIONS, SKILLS_OPTIONS, INTERESTS_OPTIONS, GRADUATION_YEARS
} from '../constants'
import styles from './Onboarding.module.css'

const STEPS = [
  { id: 'academic', title: 'Academic Background', subtitle: 'Tell us about your studies' },
  { id: 'career', title: 'Career Goals', subtitle: 'What role are you targeting?' },
  { id: 'skills', title: 'Skills & Interests', subtitle: 'What do you know and love?' },
]

const Onboarding = () => {
  const { user, updateUser } = useAuth()
  const { generateRoadmap } = useRoadmap()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const { register, handleSubmit, control, watch, trigger, formState: { errors } } = useForm({
    defaultValues: {
      degree: '', year: '', graduationYear: '',
      targetRole: '', industries: [],
      skills: [], interests: []
    }
  })

  const watchedValues = watch()

  const validateStep = async (stepIdx) => {
    const fieldsPerStep = [
      ['degree', 'year', 'graduationYear'],
      ['targetRole'],
      ['skills', 'interests']
    ]
    const valid = await trigger(fieldsPerStep[stepIdx])
    return valid
  }

  const handleNext = async () => {
    const valid = await validateStep(step)
    if (valid) setStep(s => s + 1)
  }

  const handleBack = () => setStep(s => s - 1)

  const onFinish = async (data) => {
    setIsGenerating(true)

    try {
      // Save profile
      const profile = { ...data, userId: user?.id, name: user?.name }
      localStorage.setItem('careercanvas_onboarding', JSON.stringify(profile))
      updateUser({ profile })

      // Generate roadmap
      generateRoadmap(profile)

      await new Promise(r => setTimeout(r, 1500)) // Simulate AI processing

      toast.success('Your personalized roadmap is ready! 🚀')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      setIsGenerating(false)
    }
  }

  const progress = ((step) / STEPS.length) * 100

  if (isGenerating) {
    return (
      <div className={styles.generating}>
        <motion.div
          className={styles.genContent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.genLogo}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Zap size={32} color="white" />
            </motion.div>
          </div>
          <h2>Generating your roadmap...</h2>
          <p>AI is analyzing your profile and creating a personalized career plan.</p>
          <div className={styles.genDots}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className={styles.genDot}
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgDecor} aria-hidden="true" />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Zap size={16} color="white" /></div>
          <span>CareerCanvas AI</span>
        </div>
        <div className={styles.stepIndicator} aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          Step {step + 1} of {STEPS.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressWrap} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className={styles.progressFill}
          animate={{ width: `${progress + (100 / STEPS.length)}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.card}>
          {/* Step header */}
          <div className={styles.stepHeader}>
            <div className={styles.stepIcons}>
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`${styles.stepDot} ${i < step ? styles.done : i === step ? styles.current : ''}`}
                  aria-hidden="true"
                >
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className={styles.stepTitle}>{STEPS[step].title}</h1>
                <p className={styles.stepSubtitle}>{STEPS[step].subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onFinish)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className={styles.stepContent}
              >
                {step === 0 && <AcademicStep register={register} errors={errors} />}
                {step === 1 && <CareerStep register={register} errors={errors} watch={watchedValues} />}
                {step === 2 && <SkillsStep control={control} errors={errors} watch={watchedValues} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className={styles.actions}>
              {step > 0 && (
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ marginLeft: 'auto' }} id="onboarding-generate-btn">
                  <Zap size={16} /> Generate My Roadmap
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Step 1: Academic
const AcademicStep = ({ register, errors }) => (
  <div className={styles.fields}>
    <div className="form-group">
      <label className="form-label" htmlFor="degree">Current Degree *</label>
      <select
        id="degree"
        className={`form-input ${errors.degree ? 'error' : ''}`}
        {...register('degree', { required: 'Please select your degree' })}
      >
        <option value="">Select degree...</option>
        {DEGREE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      {errors.degree && <span className="form-error"><AlertCircle size={13} />{errors.degree.message}</span>}
    </div>

    <div className={styles.fieldRow}>
      <div className="form-group">
        <label className="form-label" htmlFor="year">Current Year *</label>
        <select
          id="year"
          className={`form-input ${errors.year ? 'error' : ''}`}
          {...register('year', { required: 'Please select your year' })}
        >
          <option value="">Select year...</option>
          {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        {errors.year && <span className="form-error"><AlertCircle size={13} />{errors.year.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="graduationYear">Expected Graduation *</label>
        <select
          id="graduationYear"
          className={`form-input ${errors.graduationYear ? 'error' : ''}`}
          {...register('graduationYear', { required: 'Please select graduation year' })}
        >
          <option value="">Select year...</option>
          {GRADUATION_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        {errors.graduationYear && <span className="form-error"><AlertCircle size={13} />{errors.graduationYear.message}</span>}
      </div>
    </div>
  </div>
)

// Step 2: Career
const CareerStep = ({ register, errors, watch }) => (
  <div className={styles.fields}>
    <div className="form-group">
      <label className="form-label">Target Career Role *</label>
      <div className={styles.roleGrid}>
        {CAREER_ROLES.map(role => (
          <label key={role} className={`${styles.roleCard} ${watch.targetRole === role ? styles.selected : ''}`}>
            <input
              type="radio"
              value={role}
              className="sr-only"
              {...register('targetRole', { required: 'Please select a target role' })}
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
      {errors.targetRole && <span className="form-error"><AlertCircle size={13} />{errors.targetRole.message}</span>}
    </div>

    <div className="form-group">
      <label className="form-label">Preferred Industries (optional)</label>
      <div className={styles.checkGrid}>
        {INDUSTRY_OPTIONS.map(ind => (
          <label key={ind} className={`${styles.checkChip} ${watch.industries?.includes(ind) ? styles.checked : ''}`}>
            <input type="checkbox" value={ind} className="sr-only" {...register('industries')} />
            <span>{ind}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)

// Step 3: Skills
const SkillsStep = ({ register, errors, watch, control }) => (
  <div className={styles.fields}>
    <div className="form-group">
      <label className="form-label">Your Current Skills *</label>
      <div className={styles.checkGrid}>
        {SKILLS_OPTIONS.map(skill => (
          <label key={skill} className={`${styles.checkChip} ${watch.skills?.includes(skill) ? styles.checked : ''}`}>
            <input type="checkbox" value={skill} className="sr-only" {...register('skills', { required: false })} />
            <span>{skill}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="form-group">
      <label className="form-label">Interests *</label>
      <div className={styles.checkGrid}>
        {INTERESTS_OPTIONS.map(interest => (
          <label key={interest} className={`${styles.checkChip} ${watch.interests?.includes(interest) ? styles.checked : ''}`}>
            <input type="checkbox" value={interest} className="sr-only" {...register('interests', { required: false })} />
            <span>{interest}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)

export default Onboarding
