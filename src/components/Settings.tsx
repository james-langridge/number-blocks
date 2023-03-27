import {Link} from 'react-router-dom'

export default function Settings() {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <Link to={`/`}>Back to game</Link>
    </div>
  )
}
