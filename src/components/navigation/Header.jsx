import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Menu, ChevronLeft, ChevronRight, Bell, Command } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { NAVIGATION_ITEMS } from '../../constants'
import { useDebounce } from 'use-debounce'
import styles from './Header.module.css'

const Header = ({ onMenuClick, onCollapseClick, sidebarCollapsed }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [debouncedQuery] = useDebounce(searchQuery, 300)

  const currentPage = NAVIGATION_ITEMS.find(item =>
    location.pathname.includes(item.path.slice(1))
  )

  const searchResults = debouncedQuery.length > 1
    ? NAVIGATION_ITEMS.filter(item =>
        item.label.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : []

  const handleSearchSelect = (item) => {
    navigate(item.path)
    setSearchQuery('')
    setShowSearch(false)
  }

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        {/* Mobile menu button */}
        <button
          className={`${styles.iconBtn} ${styles.mobileOnly}`}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          id="mobile-menu-btn"
        >
          <Menu size={20} />
        </button>

        {/* Collapse button — desktop only */}
        <button
          className={`${styles.iconBtn} ${styles.desktopOnly}`}
          onClick={onCollapseClick}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Page title */}
        {currentPage && (
          <div className={styles.pageTitle}>
            <h1 className={styles.pageName}>{currentPage.label}</h1>
          </div>
        )}
      </div>

      <div className={styles.right}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <button
            className={`${styles.searchTrigger} ${showSearch ? styles.active : ''}`}
            onClick={() => setShowSearch(p => !p)}
            aria-label="Toggle search"
            aria-expanded={showSearch}
          >
            <Search size={16} />
            <span className={styles.searchPlaceholder}>Search...</span>
            <span className={styles.searchShortcut}>
              <Command size={11} />K
            </span>
          </button>

          {showSearch && (
            <div className={styles.searchDropdown} role="search">
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="search"
                  className={styles.searchInput}
                  placeholder="Search pages, features..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  aria-label="Search application"
                />
              </div>
              {searchResults.length > 0 && (
                <ul className={styles.searchResults} role="listbox" aria-label="Search results">
                  {searchResults.map(item => (
                    <li key={item.id}>
                      <button
                        className={styles.searchResult}
                        onClick={() => handleSearchSelect(item)}
                        role="option"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {debouncedQuery.length > 1 && searchResults.length === 0 && (
                <p className={styles.noResults}>No results for "{debouncedQuery}"</p>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className={styles.iconBtn} aria-label="Notifications" id="notifications-btn">
          <Bell size={18} />
          <span className={styles.notificationDot} aria-hidden="true" />
        </button>

        {/* User avatar */}
        <div className={styles.avatar} aria-label={`Logged in as ${user?.name}`} role="img">
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} />
            : user?.name?.[0]?.toUpperCase()
          }
        </div>
      </div>
    </header>
  )
}

export default Header
