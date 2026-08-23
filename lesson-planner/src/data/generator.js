/**
 * Rule-based lesson generator.
 *
 * Takes wizard answers and produces a draft LessonPlan-shaped object.
 * No API calls — everything here is template + heuristic driven, so
 * it works instantly and offline. The output is meant to be a strong
 * first draft the teacher edits, not a finished plan.
 *
 * The main lever is `isNewMaterial`: brand-new content gets a gradual
 * release structure (I do / We do / You do) with more time on direct
 * instruction and modeling; review/practice content gets more time on
 * independent or collaborative practice and less on modeling.
 */

const BLOOM_VERBS_NEW = ['identify', 'describe', 'explain', 'summarize', 'demonstrate']
const BLOOM_VERBS_REVIEW = ['apply', 'analyze', 'compare', 'evaluate', 'solve']

const ACTIVITY_LIBRARY = {
  'hands-on': {
    hook: 'a short hands-on exploration or manipulative task related to {topic}',
    practice: 'a hands-on station or task where students apply {topic} in small groups'
  },
  discussion: {
    hook: 'a think-pair-share question that surfaces what students already know about {topic}',
    practice: 'a structured discussion or debate where students reason through {topic} together'
  },
  'direct instruction': {
    hook: 'a quick demonstration or worked example showing {topic} in action',
    practice: 'guided problems worked as a class, then individually, with immediate feedback'
  },
  technology: {
    hook: 'a short video clip or interactive demo introducing {topic}',
    practice: 'a digital tool or simulation where students practice {topic} at their own pace'
  }
}

const MATERIALS_BY_SUBJECT = {
  'English/Language Arts': ['mentor text or excerpt', 'graphic organizer', 'sticky notes'],
  Math: ['whiteboards', 'manipulatives (if applicable)', 'practice problem set'],
  Science: ['lab materials or demo kit', 'data recording sheet', 'safety equipment (if applicable)'],
  'Social Studies': ['primary source excerpt or map', 'graphic organizer', 'discussion prompts'],
  Art: ['project materials/media', 'reference images', 'rubric'],
  'PE/Health': ['equipment for the activity', 'cones or markers', 'stopwatch'],
  Other: ['handout', 'slides or visual aid']
}

const ASSESSMENT_LIBRARY = [
  'a 3-question exit ticket checking the day\u2019s objective',
  'a quick thumbs-up/thumbs-down or whiteboard check for understanding',
  'a short verbal check-in with 3-4 students during practice',
  'a one-sentence summary or "muddiest point" note from each student'
]

function pick(arr, seed) {
  return arr[seed % arr.length]
}

function fill(template, topic) {
  return template.replace('{topic}', topic)
}

/**
 * @param {object} answers
 * @param {string} answers.title
 * @param {string} answers.subject
 * @param {string} answers.gradeLevel
 * @param {string} answers.topic
 * @param {number} answers.durationMinutes
 * @param {boolean} answers.isNewMaterial
 * @param {'below'|'on'|'above'} answers.priorKnowledge
 * @param {string} answers.activityStyle - key into ACTIVITY_LIBRARY
 * @param {'individual'|'pairs'|'small groups'|'whole class'} answers.grouping
 */
export function generateDraftPlan(answers) {
  const {
    title,
    subject,
    gradeLevel,
    topic,
    durationMinutes,
    isNewMaterial,
    priorKnowledge,
    activityStyle,
    grouping
  } = answers

  const activity = ACTIVITY_LIBRARY[activityStyle] || ACTIVITY_LIBRARY['direct instruction']
  const seed = (topic || '').length + (subject || '').length

  // Time allocation: new material front-loads modeling; review front-loads practice.
  const total = Number(durationMinutes) || 45
  const pct = isNewMaterial
    ? { hook: 0.12, model: 0.33, guided: 0.28, independent: 0.17, closure: 0.1 }
    : { hook: 0.1, model: 0.15, guided: 0.25, independent: 0.4, closure: 0.1 }

  const minutes = Object.fromEntries(
    Object.entries(pct).map(([k, v]) => [k, Math.max(3, Math.round(total * v))])
  )

  const verb = isNewMaterial ? pick(BLOOM_VERBS_NEW, seed) : pick(BLOOM_VERBS_REVIEW, seed)
  const objectives = `Students will be able to ${verb} ${topic}${
    gradeLevel ? ` at a level appropriate for ${gradeLevel}` : ''
  }.`

  const procedureLines = [
    `Hook (${minutes.hook} min): ${fill(activity.hook, topic)}.`,
    isNewMaterial
      ? `Direct instruction / Model (${minutes.model} min): Introduce ${topic} explicitly. Model your own thinking out loud ("I do") using a clear example.`
      : `Quick review (${minutes.model} min): Revisit ${topic} with a fast recap or worked example to reactivate prior learning.`,
    `Guided practice (${minutes.guided} min): Work through ${topic} together as a class or in ${grouping} ("we do"), checking for understanding before releasing students.`,
    `Independent/collaborative practice (${minutes.independent} min): ${fill(
      activity.practice,
      topic
    )}, working in ${grouping} ("you do").`,
    `Closure (${minutes.closure} min): Students summarize what they learned about ${topic} and complete the exit check.`
  ]

  const materials = (MATERIALS_BY_SUBJECT[subject] || MATERIALS_BY_SUBJECT.Other).join(', ')

  const assessment = ASSESSMENT_LIBRARY[seed % ASSESSMENT_LIBRARY.length]

  const differentiation =
    priorKnowledge === 'below'
      ? `Provide a scaffolded version of ${topic} (sentence starters, worked examples, or a simplified task). Consider pre-teaching key vocabulary before the lesson.`
      : priorKnowledge === 'above'
        ? `Offer an extension task that pushes students to apply ${topic} to a novel or more complex problem, or to teach/support a peer.`
        : `Pair students strategically for guided/independent practice so struggling students have support without slowing down others.`

  return {
    title: title || `${topic} (${isNewMaterial ? 'Intro' : 'Review'})`,
    subject: subject || '',
    gradeLevel: gradeLevel || '',
    unit: '',
    date: '',
    durationMinutes: total,
    objectives,
    materials,
    procedure: procedureLines.join('\n'),
    assessment,
    differentiation,
    notes: '',
    tags: isNewMaterial ? ['new material'] : ['review'],
    standards: []
  }
}
