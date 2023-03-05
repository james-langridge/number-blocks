import React, {useState} from 'react'
import './App.css'

function generateShuffledNumArr({numSquares = 8}) {
  const numbers = []

  for (let i = 0; i < numSquares; i++) {
    numbers.push(i + 1)
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  return numbers
}

function App() {
  const [currentNum, setCurrentNum] = useState(1)
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    generateShuffledNumArr({}),
  )

  function clickHandler(event: React.MouseEvent | React.KeyboardEvent) {
    const clickedNum = Number(event.currentTarget.textContent)

    if (clickedNum < currentNum) {
      return
    }

    if (clickedNum === currentNum) {
      document.getElementById(`square-${clickedNum}`)?.classList.add('green')

      if (currentNum === shuffledNumbers.length) {
        setCurrentNum(1)
        shuffledNumbers.forEach(val => {
          document.getElementById(`square-${val}`)?.classList.remove('green')
        })
        setShuffledNumbers(generateShuffledNumArr({}))

        return
      }

      setCurrentNum(() => currentNum + 1)
    }
  }

  return (
    <div className="App">
      <div className="grid-container">
        {shuffledNumbers.map((val, idx) => (
          <div
            role={'button'}
            tabIndex={idx}
            id={`square-${val}`}
            key={val}
            className="grid-item"
            onClick={clickHandler}
            onKeyDown={clickHandler}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
