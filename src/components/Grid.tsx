import React, {useEffect, useState} from 'react'
import GridSquare from './GridSquare'
import {generateShuffledNumArr} from '../lib/generateShuffledNumArr'
import {useNavigate} from 'react-router-dom'
import {playAudioAndWait} from '../lib/playAudioAndWait'

interface GridProps {
  props: {
    shuffledNumbers: number[]
    setShuffledNumbers: React.Dispatch<React.SetStateAction<number[]>>
    currentNum: number
    setCurrentNum: React.Dispatch<React.SetStateAction<number>>
    guessedNums: number[]
    setGuessedNums: React.Dispatch<React.SetStateAction<number[]>>
  }
}

export default function Grid({props}: GridProps) {
  const {
    shuffledNumbers,
    setShuffledNumbers,
    currentNum,
    setCurrentNum,
    guessedNums,
    setGuessedNums,
  } = props
  const [status, setStatus] = useState('playing')
  const [lastFourNums, setLastFourNums] = useState<number[]>([])
  const navigate = useNavigate()
  const wrongSoundEffect = new Audio('/smb_bump.wav')
  const correctSoundEffect = new Audio('/smb_1-up.wav')

  useEffect(() => {
    if (currentNum === 1) {
      return
    }

    document
      .getElementById(`square-${currentNum - 1}`)
      ?.classList.remove('current')

    document.getElementById(`square-${currentNum}`)?.classList.add('current')
  }, [currentNum])

  function updateLastFourNums(clickedNum: number) {
    const arr = [...lastFourNums]

    if (arr.length < 4) {
      arr.push(clickedNum)
      setLastFourNums(arr)

      return
    }

    arr.shift()
    arr.push(clickedNum)
    setLastFourNums(arr)
  }

  useEffect(() => {
    if (lastFourNums.toString() === '8,7,6,5') {
      navigate('/settings')
    }
  }, [lastFourNums, navigate])

  useEffect(() => {
    guessedNums.forEach(num =>
      document.getElementById(`square-${num}`)?.classList.add('correct'),
    )
  }, [])

  async function clickHandler(event: React.MouseEvent | React.KeyboardEvent) {
    if (status === 'paused') {
      return
    }

    const clickedNum = Number(event.currentTarget.textContent)

    updateLastFourNums(clickedNum)

    if (clickedNum !== currentNum) {
      void wrongSoundEffect.play()

      return
    }

    if (clickedNum === currentNum) {
      setGuessedNums([...guessedNums, clickedNum])
      document.getElementById(`square-${clickedNum}`)?.classList.add('correct')

      if (currentNum === shuffledNumbers.length) {
        setStatus('paused')
        await playAudioAndWait('/smb_stage_clear.wav')

        setCurrentNum(1)
        shuffledNumbers.forEach(val => {
          document.getElementById(`square-${val}`)?.classList.remove('correct')
        })
        setShuffledNumbers(generateShuffledNumArr())
        setGuessedNums([])
        setStatus('playing')

        return
      }

      void correctSoundEffect.play()
      setCurrentNum(() => currentNum + 1)
    }
  }

  return (
    <div className="grid">
      {shuffledNumbers.map(val => (
        <GridSquare key={val} val={val} clickHandler={clickHandler} />
      ))}
    </div>
  )
}
