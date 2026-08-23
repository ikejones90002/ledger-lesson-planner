import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LessonWizard from '../components/LessonWizard'
import LessonForm from '../components/LessonForm'
import { generateDraftPlan } from '../data/generator'
import { createEmptyLessonPlan } from '../data/schema'
import { useLessonPlans } from '../hooks/useLessonPlans'

export default function GenerateLesson() {
  const navigate = useNavigate()
  const { create } = useLessonPlans()
  const [draft, setDraft] = useState(null)

  function handleGenerate(answers) {
    const generated = generateDraftPlan(answers)
    setDraft({ ...createEmptyLessonPlan(), ...generated })
  }

  async function handleSave(plan) {
    const saved = await create(plan)
    navigate(`/lesson/${saved.id}`)
  }

  return (
    <div>
      <div className="ledger-header">
        <h1>Generate a Lesson</h1>
      </div>

      {!draft ? (
        <>
          <p style={{ color: 'var(--pencil)', maxWidth: 620, marginBottom: 20 }}>
            Answer a few questions and get a first draft — structure, objectives, materials, and
            an assessment idea — tuned for whether this is brand-new material or review. Nothing
            here is final; you'll review and edit before saving.
          </p>
          <LessonWizard onGenerate={handleGenerate} />
        </>
      ) : (
        <>
          <p style={{ color: 'var(--teal)', fontWeight: 600, marginBottom: 16 }}>
            Draft generated below — review, edit anything, then save.
          </p>
          <LessonForm initial={draft} onSave={handleSave} onCancel={() => setDraft(null)} />
        </>
      )}
    </div>
  )
}
