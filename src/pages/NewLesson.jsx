import { useNavigate } from 'react-router-dom'
import { createEmptyLessonPlan } from '../data/schema'
import { useLessonPlans } from '../hooks/useLessonPlans'
import LessonForm from '../components/LessonForm'

export default function NewLesson() {
  const navigate = useNavigate()
  const { create } = useLessonPlans()

  async function handleSave(plan) {
    const saved = await create(plan)
    navigate(`/lesson/${saved.id}`)
  }

  return (
    <div>
      <div className="ledger-header">
        <h1>New Lesson</h1>
      </div>
      <LessonForm
        initial={createEmptyLessonPlan()}
        onSave={handleSave}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}
