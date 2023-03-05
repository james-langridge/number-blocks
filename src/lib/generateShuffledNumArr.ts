export function generateShuffledNumArr(numSquares = 8) {
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
