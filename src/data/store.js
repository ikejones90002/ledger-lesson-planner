/**
 * Storage abstraction. Every function here is async on purpose, even
 * though localStorage is synchronous — that way swapping this file's
 * internals for `fetch('/api/lesson-plans')` calls later doesn't
 * touch any component code.
 */
const KEY = 'ledger.lessonPlans.v1'

function readAll() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(plans) {
  localStorage.setItem(KEY, JSON.stringify(plans))
}

export async function listPlans() {
  return readAll().sort((a, b) => (a.date || '').localeCompare(b.date || ''))
}

export async function getPlan(id) {
  return readAll().find((p) => p.id === id) || null
}

export async function savePlan(plan) {
  const plans = readAll()
  const now = new Date().toISOString()
  if (plan.id) {
    const idx = plans.findIndex((p) => p.id === plan.id)
    const updated = { ...plan, updatedAt: now }
    if (idx >= 0) plans[idx] = updated
    else plans.push(updated)
    writeAll(plans)
    return updated
  }
  const created = {
    ...plan,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now
  }
  plans.push(created)
  writeAll(plans)
  return created
}

export async function deletePlan(id) {
  writeAll(readAll().filter((p) => p.id !== id))
}
