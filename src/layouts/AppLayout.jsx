import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import Header from '../components/navigation/Header'
import styles from './AppLayout.module.css'

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`${styles.content} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
          onCollapseClick={() => setSidebarCollapsed(p => !p)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className={styles.main} id="main-content" role="main">
          <Outlet />
        </main>
      </div>

      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default AppLayout
