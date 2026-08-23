import { NavLink } from 'react-router-dom'
import ledgerLogo from '../assests/ledger-logo.png'

const links = [
  { to: '/dashboard', label: 'All Lessons', end: true },
  { to: '/calendar', label: 'Pacing Calendar' },
  { to: '/generate', label: '✦ Generate Lesson' },
  { to: '/new', label: '+ New Lesson' }
]

export default function Sidebar() {
  return (
    <nav className="binder">
      <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
        <div className="binder-brand">
          <img src={ledgerLogo} alt="Ledger" style={{ height: '64px', width: 'auto', cursor: 'pointer' }} />
        </div>
      </NavLink>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => 'binder-tab' + (isActive ? ' active' : '')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
