export function playAudioAndWait(path: string) {
  return new Promise(resolve => {
    const audio = new Audio(path)
    audio.addEventListener('ended', resolve)
    void audio.play()
  })
}
