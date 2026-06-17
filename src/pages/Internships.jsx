import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, Plus, Search, Filter, Edit, Trash2, ExternalLink,
  SortAsc, Download, X, AlertCircle
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useInternship } from '../context/InternshipContext'
import { INTERNSHIP_STATUSES } from '../constants'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import styles from './Internships.module.css'

const Internships = () => {
  const { internships, addInternship, updateInternship, deleteInternship, getStats } = useInternship()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [debouncedSearch] = useDebounce(search, 300)

  const stats = getStats()

  const filtered = useMemo(() => {
    let list = [...internships]
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      list = list.filter(i =>
        i.company?.toLowerCase().includes(q) ||
        i.role?.toLowerCase().includes(q) ||
        i.notes?.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'all') {
      list = list.filter(i => i.status === statusFilter)
    }
    if (sortBy === 'date') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sortBy === 'company') list.sort((a, b) => a.company?.localeCompare(b.company))
    return list
  }, [internships, debouncedSearch, statusFilter, sortBy])

  const handleDelete = (id) => {
    deleteInternship(id)
    toast.success('Application removed')
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  const exportCSV = () => {
    const rows = [
      ['Company', 'Role', 'Date', 'Status', 'Notes', 'Link'],
      ...internships.map(i => [i.company, i.role, i.date, i.status, i.notes, i.link])
    ]
    const csv = rows.map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'internships.csv'; a.click()
    toast.success('Exported as CSV!')
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Internship Tracker</h1>
          <p className={styles.subtitle}>Manage all your applications in one place</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-secondary btn-sm" onClick={exportCSV} id="export-csv-btn">
            <Download size={15} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={handleAdd} id="add-internship-btn">
            <Plus size={16} /> Add Application
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {INTERNSHIP_STATUSES.map(s => (
          <button
            key={s.id}
            className={`${styles.statChip} ${statusFilter === s.id ? styles.activeChip : ''}`}
            onClick={() => setStatusFilter(statusFilter === s.id ? 'all' : s.id)}
            style={{ '--chip-color': s.color, '--chip-bg': s.bg }}
          >
            <span className={styles.statVal}>{stats[s.id] || 0}</span>
            <span className={styles.statLbl}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={`form-input ${styles.searchInput}`}
            placeholder="Search companies, roles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search internships"
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>

        <select
          className="form-input"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ maxWidth: 160 }}
          aria-label="Sort by"
        >
          <option value="date">Sort by Date</option>
          <option value="company">Sort by Company</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        {filtered.length > 0 ? (
          <table className={styles.table} role="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((item, i) => {
                  const statusDef = INTERNSHIP_STATUSES.find(s => s.id === item.status)
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td>
                        <div className={styles.companyCell}>
                          <div className={styles.companyAvatar}>
                            {item.company?.[0]?.toUpperCase()}
                          </div>
                          <span className={styles.companyName}>{item.company}</span>
                        </div>
                      </td>
                      <td className={styles.roleCell}>{item.role}</td>
                      <td className={styles.dateCell}>{item.date}</td>
                      <td>
                        <span
                          className={`badge ${styles.statusBadge}`}
                          style={{ color: statusDef?.color, background: statusDef?.bg }}
                        >
                          {statusDef?.label}
                        </span>
                      </td>
                      <td className={styles.notesCell}>{item.notes || '—'}</td>
                      <td>
                        <div className={styles.actions}>
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} aria-label="Open link">
                              <ExternalLink size={15} />
                            </a>
                          )}
                          <button className={styles.actionBtn} onClick={() => handleEdit(item)} aria-label="Edit">
                            <Edit size={15} />
                          </button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(item.id)} aria-label="Delete">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><Briefcase size={28} /></div>
            <p>{debouncedSearch ? `No results for "${debouncedSearch}"` : 'No applications yet. Add your first one!'}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <InternshipModal
            item={editItem}
            onClose={() => setModalOpen(false)}
            onSave={(data) => {
              if (editItem) {
                updateInternship(editItem.id, data)
                toast.success('Application updated!')
              } else {
                addInternship(data)
                toast.success('Application added!')
              }
              setModalOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const InternshipModal = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: item || { company: '', role: '', date: new Date().toISOString().split('T')[0], status: 'applied', notes: '', link: '' }
  })

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="modal">
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="modal-header">
            <h2 className="heading-sm">{item ? 'Edit Application' : 'Add Application'}</h2>
            <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSave)}>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Company *</label>
                <input className={`form-input ${errors.company ? 'error' : ''}`} {...register('company', { required: true })} placeholder="Google" />
              </div>
              <div className="form-group">
                <label className="form-label">Role *</label>
                <input className={`form-input ${errors.role ? 'error' : ''}`} {...register('role', { required: true })} placeholder="Software Engineer Intern" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div className="form-group">
                  <label className="form-label">Date Applied</label>
                  <input type="date" className="form-input" {...register('date')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" {...register('status')}>
                    {INTERNSHIP_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Application Link</label>
                <input type="url" className="form-input" {...register('link')} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-input" rows={3} {...register('notes')} placeholder="Any notes..." style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" id="save-internship-btn">
                {item ? 'Save Changes' : 'Add Application'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  )
}

export default Internships
