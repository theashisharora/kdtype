import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useGame } from '~hooks/useGameContext'
import { useKeyboardInput } from '~hooks/useKeyboardInput'

export const CurrentWord = observer(function CurrentWord() {
  const { game } = useGame()

  const rInput = useKeyboardInput()

  React.useEffect(() => {
    if (game.state === 'word_transitioning_in' || game.state === 'word_transitioning_out') {
      setTimeout(() => {
        game.dispatch({ type: 'animation_complete' })
      }, 500)
    }
  }, [game, game.state])

  const syllables = (game.currentWord ?? '').match(/(\S[\u0900-\u097F]*)/g) || []

  return (
    <div className="currentword">
      <div className="pronunciation">{game.currentPronunciation}</div>
      <input ref={rInput} className="input" autoFocus />

      {syllables.map((syllable, i) => (
        <span
          key={i}
          className={
            game.state === 'word_complete'
              ? 'celebrate'
              : 3 * i === game.currentIndex
              ? 'current'
              : 3 * i < game.currentIndex
              ? 'celebrate'
              : ''
          }
        >
          {syllable}
        </span>
      ))}

      <div className="meaning">Meaning: {game.currentMeaning}</div>
    </div>
  )
})
