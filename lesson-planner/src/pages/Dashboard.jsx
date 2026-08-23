import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLessonPlans } from '../hooks/useLessonPlans'
import { SUBJECT_COLORS } from '../data/schema'
import LessonCard from '../components/LessonCard'

export default function Dashboard() {
  const { plans, loading } = useLessonPlans()
  const [subjectFilter, setSubjectFilter] = useState('')
  const [gradeFilter, setGradeFilter] = useState('')
  const [search, setSearch] = useState('')

  const grades = useMemo(
    () => [...new Set(plans.map((p) => p.gradeLevel).filter(Boolean))],
    [plans]
  )

  const filtered = plans.filter((p) => {
    if (subjectFilter && p.subject !== subjectFilter) return false
    if (gradeFilter && p.gradeLevel !== gradeFilter) return false
    if (search) {
      const haystack = `${p.title} ${p.unit} ${p.tags.join(' ')}`.toLowerCase()
      if (!haystack.includes(search.toLowerCase())) return false
    }
    return true
  })

  return (
    <div>
      <div className="ledger-header">
        <h1>All Lessons</h1>
        <Link to="/new" className="btn btn-primary">
          + New Lesson
        </Link>
      </div>

      <div className="filter-row">
        <input
          placeholder="Search title, unit, tags…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">All subjects</option>
          {Object.keys(SUBJECT_COLORS).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {grades.length > 0 && (
          <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
            <option value="">All grades</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          {plans.length === 0 ? (
            <>
              No lessons yet. <Link to="/new">Create your first one</Link> to get started.
            </>
          ) : (
            'No lessons match these filters.'
          )}
        </div>
      ) : (
        filtered.map((plan) => <LessonCard key={plan.id} plan={plan} />)
      )}
    </div>
  )
}
