import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLessonPlans } from '../hooks/useLessonPlans'
import { colorForSubject } from '../data/schema'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

function toISODate(date) {
  return date.toISOString().slice(0, 10)
}

export default function Calendar() {
  const { plans } = useLessonPlans()
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()))

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + i)
      return d
    })
  }, [weekStart])

  function shiftWeek(delta) {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + delta * 7)
    setWeekStart(d)
  }

  return (
    <div>
      <div className="ledger-header">
        <h1>Pacing Calendar</h1>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => shiftWeek(-1)}>
            ← Prev week
          </button>
          <button className="btn btn-ghost" onClick={() => setWeekStart(startOfWeek(new Date()))}>
            This week
          </button>
          <button className="btn btn-ghost" onClick={() => shiftWeek(1)}>
            Next week →
          </button>
        </div>
      </div>

      <div className="week-strip">
        {days.map((day, i) => {
          const iso = toISODate(day)
          const dayPlans = plans.filter((p) => p.date === iso)
          return (
            <div className="week-day" key={iso}>
              <div className="week-day-label">
                {DAY_LABELS[i]} {day.getMonth() + 1}/{day.getDate()}
              </div>
              {dayPlans.map((p) => (
                <Link
                  key={p.id}
                  to={`/lesson/${p.id}`}
                  className="lesson-chip"
                  style={{ borderLeftColor: colorForSubject(p.subject) }}
                >
                  {p.title || 'Untitled'}
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
