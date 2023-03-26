export function generateShuffledNumArr(numSquares = 8) {
  const numbers = Array.from({length: numSquares}, (_, i) => i + 1)

  // Fisher-Yates (Knuth) shuffle algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  return numbers
}
