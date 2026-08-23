import { useState } from 'react'
import { SUBJECT_COLORS } from '../data/schema'
import StandardsEditor from './StandardsEditor'

export default function LessonForm({ initial, onSave, onCancel }) {
  const [plan, setPlan] = useState(initial)

  function update(field, value) {
    setPlan((p) => ({ ...p, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(plan)
  }

  return (
    <form className="plan-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={plan.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Introduction to Fractions"
          required
        />
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            value={plan.subject}
            onChange={(e) => update('subject', e.target.value)}
          >
            <option value="">Select subject</option>
            {Object.keys(SUBJECT_COLORS).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gradeLevel">Grade level</label>
          <input
            id="gradeLevel"
            value={plan.gradeLevel}
            onChange={(e) => update('gradeLevel', e.target.value)}
            placeholder="e.g. 4th grade"
          />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="date">Date taught</label>
          <input
            id="date"
            type="date"
            value={plan.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            min="5"
            step="5"
            value={plan.durationMinutes}
            onChange={(e) => update('durationMinutes', Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="unit">Unit</label>
        <input
          id="unit"
          value={plan.unit}
          onChange={(e) => update('unit', e.target.value)}
          placeholder="e.g. Unit 3: Fractions & Decimals"
        />
      </div>

      <div>
        <label htmlFor="objectives">Objectives</label>
        <textarea
          id="objectives"
          value={plan.objectives}
          onChange={(e) => update('objectives', e.target.value)}
          placeholder="What should students know or be able to do by the end?"
        />
      </div>

      <div>
        <label htmlFor="procedure">Procedure</label>
        <textarea
          id="procedure"
          value={plan.procedure}
          onChange={(e) => update('procedure', e.target.value)}
          placeholder="Step-by-step plan for the lesson"
        />
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="materials">Materials</label>
          <textarea
            id="materials"
            value={plan.materials}
            onChange={(e) => update('materials', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="assessment">Assessment</label>
          <textarea
            id="assessment"
            value={plan.assessment}
            onChange={(e) => update('assessment', e.target.value)}
            placeholder="How will you check for understanding?"
          />
        </div>
      </div>

      <div>
        <label htmlFor="differentiation">Differentiation</label>
        <textarea
          id="differentiation"
          value={plan.differentiation}
          onChange={(e) => update('differentiation', e.target.value)}
          placeholder="Accommodations, extensions, supports"
        />
      </div>

      <StandardsEditor
        standards={plan.standards || []}
        onChange={(standards) => update('standards', standards)}
      />

      <div>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          id="tags"
          value={plan.tags.join(', ')}
          onChange={(e) =>
            update(
              'tags',
              e.target.value
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          placeholder="e.g. group work, lab"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save lesson
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
