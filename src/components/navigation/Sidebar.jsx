import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { NAVIGATION_ITEMS } from '../../constants'
import styles from './Sidebar.module.css'

const Sidebar = ({ collapsed, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarContent
          collapsed={collapsed}
          user={user}
          isDark={isDark}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className={`${styles.sidebar} ${styles.mobile}`}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <SidebarContent
              collapsed={false}
              user={user}
              isDark={isDark}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
              onNavClick={onMobileClose}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

const SidebarContent = ({ collapsed, user, isDark, toggleTheme, onLogout, onNavClick }) => {
  return (
    <div className={styles.sidebarInner}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Icons.Zap size={20} color="white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.logoText}
          >
            <span className={styles.logoName}>CareerCanvas</span>
            <span className={styles.logoSuffix}>AI</span>
          </motion.div>
        )}
      </div>

      <div className={styles.divider} />

      {/* Navigation */}
      <nav className={styles.nav} aria-label="App sections">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = Icons[item.icon] || Icons.Circle
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onNavClick}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              aria-label={item.label}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>
                <IconComponent size={18} />
              </span>
              {!collapsed && (
                <motion.span
                  className={styles.navLabel}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.divider} />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={styles.themeBtn}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          <span className={styles.navIcon}>
            {isDark ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
          </span>
          {!collapsed && (
            <motion.span className={styles.navLabel} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          )}
        </button>

        {/* User info */}
        {!collapsed && user && (
          <div className={styles.userCard}>
            <div className={styles.userAvatar} aria-hidden="true">
              {user.avatar
                ? <img src={user.avatar} alt={user.name} />
                : user.name?.[0]?.toUpperCase()
              }
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          className={`${styles.navItem} ${styles.logoutBtn}`}
          aria-label="Log out"
          title={collapsed ? 'Logout' : undefined}
        >
          <span className={styles.navIcon}><Icons.LogOut size={18} /></span>
          {!collapsed && <span className={styles.navLabel}>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
