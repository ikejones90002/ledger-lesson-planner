import { Link } from 'react-router-dom'
import { colorForSubject } from '../data/schema'

export default function LessonCard({ plan }) {
  return (
    <Link
      to={`/lesson/${plan.id}`}
      className="lesson-card"
      style={{ borderLeftColor: colorForSubject(plan.subject) }}
    >
      <div className="lesson-card-top">
        <h3>{plan.title || 'Untitled lesson'}</h3>
        <span className="lesson-meta">{plan.date || 'No date set'}</span>
      </div>
      <div className="lesson-meta">
        {[plan.subject, plan.gradeLevel, plan.unit].filter(Boolean).join(' · ') ||
          'No subject or unit set'}
      </div>
      {plan.tags?.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {plan.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
