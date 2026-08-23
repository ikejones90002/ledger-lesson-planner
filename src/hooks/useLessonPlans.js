import { useCallback, useEffect, useState } from 'react'
import { listPlans, savePlan, deletePlan } from '../data/store'

export function useLessonPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    setPlans(await listPlans())
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const create = useCallback(
    async (plan) => {
      const saved = await savePlan(plan)
      await refresh()
      return saved
    },
    [refresh]
  )

  const remove = useCallback(
    async (id) => {
      await deletePlan(id)
      await refresh()
    },
    [refresh]
  )

  return { plans, loading, create, remove, refresh }
}
