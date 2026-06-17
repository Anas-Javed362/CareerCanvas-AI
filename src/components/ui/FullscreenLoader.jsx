import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import styles from './FullscreenLoader.module.css'

const FullscreenLoader = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <motion.div
        className={styles.logoWrap}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className={styles.logo}>
          <Zap size={28} color="white" />
        </div>
      </motion.div>
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default FullscreenLoader
