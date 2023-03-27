import React, {useEffect, useState} from 'react'
import GridSquare from './GridSquare'
import {generateShuffledNumArr} from '../lib/generateShuffledNumArr'
import {useNavigate} from 'react-router-dom'

export default function Grid() {
  const [currentNum, setCurrentNum] = useState(1)
  const [status, setStatus] = useState('playing')
  const [shuffledNumbers, setShuffledNumbers] = useState(() =>
    generateShuffledNumArr(),
  )
  const [lastFourNums, setLastFourNums] = useState<number[]>([])
  const navigate = useNavigate()
  const wrongSoundEffect = new Audio('/smb_bump.wav')
  const correctSoundEffect = new Audio('/smb_1-up.wav')

  function playAudioAndWait(path: string) {
    return new Promise(resolve => {
      const audio = new Audio(path)
      audio.addEventListener('ended', resolve)
      void audio.play()
    })
  }

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
      // TODO: save game state first
      navigate('/settings')
    }
  }, [lastFourNums, navigate])

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
      document.getElementById(`square-${clickedNum}`)?.classList.add('correct')

      if (currentNum === shuffledNumbers.length) {
        setStatus('paused')
        await playAudioAndWait('/smb_stage_clear.wav')

        setCurrentNum(1)
        shuffledNumbers.forEach(val => {
          document.getElementById(`square-${val}`)?.classList.remove('correct')
        })
        setShuffledNumbers(generateShuffledNumArr())
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
