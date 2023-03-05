import React, {useState} from 'react'
import GridSquare from './GridSquare'
import {generateShuffledNumArr} from './utils'

export default function Grid() {
  const [currentNum, setCurrentNum] = useState(1)
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    generateShuffledNumArr(),
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
        setShuffledNumbers(generateShuffledNumArr())

        return
      }

      setCurrentNum(() => currentNum + 1)
    }
  }

  return (
    <div className="grid-container">
      {shuffledNumbers.map(val => (
        <GridSquare key={val} val={val} clickHandler={clickHandler} />
      ))}
    </div>
  )
}
