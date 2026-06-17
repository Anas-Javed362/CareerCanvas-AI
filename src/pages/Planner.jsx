import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { motion } from 'framer-motion'
import { KanbanSquare, GripVertical, CheckCircle, Circle, Clock } from 'lucide-react'
import { useRoadmap } from '../context/RoadmapContext'
import { KANBAN_COLUMNS, MILESTONE_STATUS } from '../constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from './Planner.module.css'

const Planner = () => {
  const { activeRoadmap, milestoneStatus, updateMilestoneStatus, reorderMilestones } = useRoadmap()
  const navigate = useNavigate()

  if (!activeRoadmap) {
    return (
      <div className={styles.page}>
        <div className="empty-state">
          <div className="empty-state-icon"><KanbanSquare size={32} /></div>
          <h2>No Roadmap Yet</h2>
          <p>Generate your career roadmap first to use the planner.</p>
          <button className="btn btn-primary" onClick={() => navigate('/onboarding')}>Go to Onboarding</button>
        </div>
      </div>
    )
  }

  // Group milestones by column
  const columns = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.id] = activeRoadmap.milestones.filter(m =>
      (milestoneStatus[m.id] || 'todo') === col.id
    )
    return acc
  }, {})

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Update status if moved to different column
    if (destination.droppableId !== source.droppableId) {
      updateMilestoneStatus(draggableId, destination.droppableId)
      if (destination.droppableId === 'completed') {
        toast.success('Milestone completed! 🎉')
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Task Planner</h1>
          <p className={styles.subtitle}>Drag and drop milestones to track your progress</p>
        </div>
        <div className={styles.stats}>
          {KANBAN_COLUMNS.map(col => (
            <div key={col.id} className={styles.colStat}>
              <span className={styles.colStatVal} style={{ color: col.color }}>{columns[col.id]?.length || 0}</span>
              <span className={styles.colStatLabel}>{col.title}</span>
            </div>
          ))}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {KANBAN_COLUMNS.map(column => (
            <div key={column.id} className={styles.column}>
              <div className={styles.columnHeader}>
                <div className={styles.columnTitle}>
                  <div className={styles.columnDot} style={{ background: column.color }} />
                  <span>{column.title}</span>
                </div>
                <span className={styles.columnCount}>{columns[column.id]?.length || 0}</span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.columnBody} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                  >
                    {columns[column.id]?.map((m, index) => (
                      <Draggable key={m.id} draggableId={m.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
                          >
                            <div className={styles.cardHeader}>
                              <div
                                {...provided.dragHandleProps}
                                className={styles.dragHandle}
                                aria-label={`Drag ${m.title}`}
                              >
                                <GripVertical size={14} />
                              </div>
                              <span className={styles.cardTitle}>{m.title}</span>
                            </div>
                            <div className={styles.cardMeta}>
                              <span className="badge badge-gray"><Clock size={11} /> {m.duration}</span>
                              <span className={`badge badge-${{ Beginner: 'green', Intermediate: 'yellow', Advanced: 'red' }[m.difficulty]}`}>
                                {m.difficulty}
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {columns[column.id]?.length === 0 && !snapshot.isDraggingOver && (
                      <div className={styles.emptyCol}>Drop milestones here</div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Planner
