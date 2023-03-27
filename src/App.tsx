import './App.css'
import Grid from './components/Grid'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Settings from './components/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
