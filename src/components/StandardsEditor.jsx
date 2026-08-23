import { useState } from 'react'
import { STANDARDS_FRAMEWORKS } from '../data/standardsFrameworks'

export default function StandardsEditor({ standards, onChange }) {
  const [framework, setFramework] = useState(STANDARDS_FRAMEWORKS[0])
  const [code, setCode] = useState('')

  function addStandard() {
    if (!code.trim()) return
    onChange([...standards, { framework, code: code.trim() }])
    setCode('')
  }

  function removeStandard(idx) {
    onChange(standards.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <label>Standards alignment</label>
      <div className="form-row" style={{ marginBottom: 8 }}>
        <select value={framework} onChange={(e) => setFramework(e.target.value)}>
          {STANDARDS_FRAMEWORKS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. CCSS.MATH.4.NF.A.1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addStandard()
              }
            }}
          />
          <button type="button" className="btn btn-ghost" onClick={addStandard}>
            Add
          </button>
        </div>
      </div>
      {standards.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {standards.map((s, idx) => (
            <span className="tag" key={`${s.framework}-${s.code}-${idx}`} style={{ marginBottom: 6 }}>
              {s.code} ({s.framework})
              <button
                type="button"
                onClick={() => removeStandard(idx)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'var(--coral)',
                  marginLeft: 6,
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit'
                }}
                aria-label={`Remove ${s.code}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
