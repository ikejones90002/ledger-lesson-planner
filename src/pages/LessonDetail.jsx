import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getPlan, savePlan, deletePlan } from '../data/store'
import LessonForm from '../components/LessonForm'

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plan, setPlan] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    getPlan(id).then((p) => setPlan(p))
  }, [id])

  if (!plan) {
    return <p>Loading…</p>
  }

  async function handleSave(updated) {
    const saved = await savePlan(updated)
    setPlan(saved)
    setEditing(false)
  }

  async function handleDelete() {
    if (confirm('Delete this lesson plan? This can\u2019t be undone.')) {
      await deletePlan(id)
      navigate('/')
    }
  }

  if (editing) {
    return (
      <div>
        <div className="ledger-header">
          <h1>Edit Lesson</h1>
        </div>
        <LessonForm initial={plan} onSave={handleSave} onCancel={() => setEditing(false)} />
      </div>
    )
  }

  return (
    <div>
      <div className="ledger-header">
        <h1>{plan.title || 'Untitled lesson'}</h1>
        <div className="form-actions no-print">
          <button className="btn btn-ghost" onClick={() => window.print()}>
            Print
          </button>
          <button className="btn btn-ghost" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <p className="lesson-meta">
        {[plan.subject, plan.gradeLevel, plan.unit, plan.date].filter(Boolean).join(' · ')}
        {plan.durationMinutes ? ` · ${plan.durationMinutes} min` : ''}
      </p>

      <Detail label="Objectives" value={plan.objectives} />
      <Detail label="Procedure" value={plan.procedure} />
      <Detail label="Materials" value={plan.materials} />
      <Detail label="Assessment" value={plan.assessment} />
      <Detail label="Differentiation" value={plan.differentiation} />
      <Detail label="Notes" value={plan.notes} />

      {plan.standards?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--pencil)',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: 6
            }}
          >
            Standards
          </div>
          {plan.standards.map((s, idx) => (
            <span className="tag" key={idx}>
              {s.code} ({s.framework})
            </span>
          ))}
        </div>
      )}

      {plan.tags?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {plan.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}

      <p className="no-print" style={{ marginTop: 32 }}>
        <Link to="/">← Back to all lessons</Link>
      </p>
    </div>
  )
}

function Detail({ label, value }) {
  if (!value) return null
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--pencil)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          marginBottom: 4
        }}
      >
        {label}
      </div>
      <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
    </div>
  )
}
