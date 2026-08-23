/**
 * LessonPlan shape.
 *
 * Kept flat and JSON-serializable on purpose: today it's saved to
 * localStorage, later it can be the exact payload sent to an API
 * without reshaping anything.
 *
 * Fields marked "future" are present now so the schema doesn't need
 * a migration when you add standards alignment or multi-teacher/public
 * accounts later — they just start getting populated.
 */
export function createEmptyLessonPlan() {
  return {
    id: null, // set on save
    ownerId: 'local', // future: real user id once accounts exist
    visibility: 'private', // future: 'private' | 'school' | 'public'

    title: '',
    subject: '',
    gradeLevel: '',
    unit: '',
    date: '', // ISO date the lesson is taught
    durationMinutes: 45,

    objectives: '', // what students should know/do by the end
    materials: '',
    procedure: '', // the actual step-by-step plan
    assessment: '', // how you'll check for understanding
    differentiation: '', // notes for accommodations/extensions
    notes: '',

    tags: [], // freeform, e.g. ["lab", "group work"]

    // Future: standards alignment. Kept as an array of codes + a
    // free-text framework name so you can support CA, TN, Common Core,
    // NGSS, etc. without changing shape — just start filling this in.
    standards: [], // e.g. [{ framework: "Common Core", code: "CCSS.MATH.4.NF.A.1" }]

    createdAt: null,
    updatedAt: null
  }
}

export const SUBJECT_COLORS = {
  'English/Language Arts': '#2F6F62',
  'Math': '#22314F',
  'Science': '#7A6A2F',
  'Social Studies': '#8A3B2F',
  'Art': '#B0563B',
  'PE/Health': '#4B6A8C',
  'Other': '#8A8578'
}

export function colorForSubject(subject) {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS.Other
}
