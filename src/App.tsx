import './App.css'
import Grid from './components/Grid'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Settings from './components/Settings'
import {useState} from 'react'
import {generateShuffledNumArr} from './lib/generateShuffledNumArr'

function App() {
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    generateShuffledNumArr(),
  )
  const [currentNum, setCurrentNum] = useState(1)
  const [guessedNums, setGuessedNums] = useState<number[]>([])
  const gridProps = {
    shuffledNumbers,
    setShuffledNumbers,
    currentNum,
    setCurrentNum,
    guessedNums,
    setGuessedNums,
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Grid props={gridProps} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
