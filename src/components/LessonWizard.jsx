import { useState } from 'react'
import { SUBJECT_COLORS } from '../data/schema'

const ACTIVITY_STYLES = [
  { value: 'hands-on', label: 'Hands-on / manipulatives' },
  { value: 'discussion', label: 'Discussion-based' },
  { value: 'direct instruction', label: 'Direct instruction' },
  { value: 'technology', label: 'Technology / digital tool' }
]

const GROUPINGS = ['individual', 'pairs', 'small groups', 'whole class']

const STEPS = ['basics', 'material', 'style', 'review']

export default function LessonWizard({ onGenerate }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    topic: '',
    durationMinutes: 45,
    isNewMaterial: true,
    priorKnowledge: 'on',
    activityStyle: 'direct instruction',
    grouping: 'small groups'
  })

  function update(field, value) {
    setAnswers((a) => ({ ...a, [field]: value }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  const canProceedFromBasics = answers.topic.trim().length > 0

  return (
    <div className="plan-form" style={{ maxWidth: 640 }}>
      {step === 0 && (
        <>
          <div>
            <label htmlFor="w-topic">What's the topic? *</label>
            <input
              id="w-topic"
              value={answers.topic}
              onChange={(e) => update('topic', e.target.value)}
              placeholder="e.g. long division, the water cycle, persuasive essays"
              autoFocus
            />
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="w-subject">Subject</label>
              <select
                id="w-subject"
                value={answers.subject}
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
              <label htmlFor="w-grade">Grade level</label>
              <input
                id="w-grade"
                value={answers.gradeLevel}
                onChange={(e) => update('gradeLevel', e.target.value)}
                placeholder="e.g. 4th grade"
              />
            </div>
          </div>
          <div>
            <label htmlFor="w-duration">Class duration (minutes)</label>
            <input
              id="w-duration"
              type="number"
              min="10"
              step="5"
              value={answers.durationMinutes}
              onChange={(e) => update('durationMinutes', Number(e.target.value))}
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!canProceedFromBasics}
              onClick={next}
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div>
            <label>Is this brand-new material for students, or review/practice?</label>
            <div className="form-actions" style={{ marginTop: 4 }}>
              <button
                type="button"
                className={answers.isNewMaterial ? 'btn btn-primary' : 'btn btn-ghost'}
                onClick={() => update('isNewMaterial', true)}
              >
                New material
              </button>
              <button
                type="button"
                className={!answers.isNewMaterial ? 'btn btn-primary' : 'btn btn-ghost'}
                onClick={() => update('isNewMaterial', false)}
              >
                Review / practice
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="w-prior">Where are students starting from?</label>
            <select
              id="w-prior"
              value={answers.priorKnowledge}
              onChange={(e) => update('priorKnowledge', e.target.value)}
            >
              <option value="below">Below grade level / needs scaffolding</option>
              <option value="on">On track / mixed readiness</option>
              <option value="above">Ahead / ready for a challenge</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={back}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={next}>
              Next
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label htmlFor="w-activity">Preferred activity style</label>
            <select
              id="w-activity"
              value={answers.activityStyle}
              onChange={(e) => update('activityStyle', e.target.value)}
            >
              {ACTIVITY_STYLES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="w-grouping">Practice grouping</label>
            <select
              id="w-grouping"
              value={answers.grouping}
              onChange={(e) => update('grouping', e.target.value)}
            >
              {GROUPINGS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={back}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={next}>
              Generate draft
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <div>
          <p style={{ color: 'var(--pencil)' }}>
            Ready to generate a draft lesson on <strong>{answers.topic}</strong>
            {answers.gradeLevel ? ` for ${answers.gradeLevel}` : ''}. You'll be able to edit
            everything before saving.
          </p>
          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={back}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => onGenerate(answers)}>
              Generate lesson
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
