import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { User, Edit, Save, X, Upload, Download, Briefcase, GraduationCap, Target, Code } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { jsPDF } from 'jspdf'
import styles from './Profile.module.css'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(() => {
    const profile = JSON.parse(localStorage.getItem('careercanvas_onboarding') || '{}')
    return {
      name: user?.name || '',
      email: user?.email || '',
      degree: profile.degree || '',
      year: profile.year || '',
      targetRole: profile.targetRole || '',
      skills: profile.skills || [],
      interests: profile.interests || [],
      bio: user?.bio || ''
    }
  })
  const fileRef = useRef()

  const handleSave = () => {
    updateUser({ name: form.name, bio: form.bio })
    const profile = JSON.parse(localStorage.getItem('careercanvas_onboarding') || '{}')
    localStorage.setItem('careercanvas_onboarding', JSON.stringify({ ...profile, ...form }))
    setEditing(false)
    toast.success('Profile updated!')
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      updateUser({ avatar: ev.target.result })
      toast.success('Profile photo updated!')
    }
    reader.readAsDataURL(file)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text(form.name, 20, 25)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Email: ${form.email}`, 20, 38)
    doc.text(`Degree: ${form.degree} (${form.year})`, 20, 48)
    doc.text(`Target Role: ${form.targetRole}`, 20, 58)
    doc.text('Skills:', 20, 72)
    doc.text(form.skills?.join(', ') || 'None', 20, 82)
    doc.text('Interests:', 20, 96)
    doc.text(form.interests?.join(', ') || 'None', 20, 106)
    if (form.bio) {
      doc.text('About:', 20, 120)
      const lines = doc.splitTextToSize(form.bio, 170)
      doc.text(lines, 20, 130)
    }
    doc.save(`${form.name.replace(' ', '_')}_CareerProfile.pdf`)
    toast.success('Profile exported as PDF!')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.headerActions}>
          <button className="btn btn-secondary btn-sm" onClick={exportPDF} id="export-profile-pdf">
            <Download size={15} /> Export PDF
          </button>
          {editing ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}><X size={15} /> Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleSave}><Save size={15} /> Save</button>
            </>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)} id="edit-profile-btn">
              <Edit size={15} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {/* Left: Avatar + basic info */}
        <div className={styles.leftCol}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} />
                : <span>{form.name?.[0]?.toUpperCase()}</span>
              }
              <button
                className={styles.uploadBtn}
                onClick={() => fileRef.current?.click()}
                aria-label="Upload profile photo"
              >
                <Upload size={14} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarUpload}
                id="avatar-upload"
              />
            </div>
            {editing ? (
              <input
                className={`form-input ${styles.nameInput}`}
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
              />
            ) : (
              <h2 className={styles.name}>{form.name}</h2>
            )}
            <p className={styles.email}>{form.email}</p>
            {form.targetRole && (
              <span className="badge badge-blue" style={{ marginTop: 'var(--space-2)' }}>
                <Target size={12} /> {form.targetRole}
              </span>
            )}
          </div>

          {/* Bio */}
          <div className={styles.bioSection}>
            <h3 className={styles.sectionTitle}>About</h3>
            {editing ? (
              <textarea
                className="form-input"
                rows={4}
                value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                placeholder="Write a brief career summary..."
                style={{ resize: 'vertical' }}
              />
            ) : (
              <p className={styles.bio}>{form.bio || 'No bio added yet.'}</p>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className={styles.rightCol}>
          {/* Academic */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <GraduationCap size={16} /> Academic Background
            </h3>
            <div className={styles.detailGrid}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Degree</span>
                {editing ? (
                  <input className="form-input" value={form.degree} onChange={e => setForm(p => ({ ...p, degree: e.target.value }))} />
                ) : (
                  <span className={styles.detailValue}>{form.degree || '—'}</span>
                )}
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Year</span>
                {editing ? (
                  <input className="form-input" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))} />
                ) : (
                  <span className={styles.detailValue}>{form.year || '—'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Target Role */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}><Briefcase size={16} /> Career Goal</h3>
            {editing ? (
              <input className="form-input" value={form.targetRole} onChange={e => setForm(p => ({ ...p, targetRole: e.target.value }))} placeholder="Target Role" />
            ) : (
              <p className={styles.detailValue}>{form.targetRole || '—'}</p>
            )}
          </div>

          {/* Skills */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}><Code size={16} /> Skills</h3>
            <div className={styles.tagList}>
              {form.skills?.length > 0
                ? form.skills.map(s => <span key={s} className="badge badge-blue">{s}</span>)
                : <span className={styles.detailValue}>No skills added</span>
              }
            </div>
          </div>

          {/* Interests */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}><User size={16} /> Interests</h3>
            <div className={styles.tagList}>
              {form.interests?.length > 0
                ? form.interests.map(i => <span key={i} className="badge badge-cyan">{i}</span>)
                : <span className={styles.detailValue}>No interests added</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
