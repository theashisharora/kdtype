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
      <div className="pronunciation">Pronunciation: {game.currentPronunciation}</div>
      <input ref={rInput} className="input" autoFocus />

      {syllables.map((syllable, i) => (
        <span
          key={i}
          data-status={
            game.state === 'word_complete'
              ? 'celebrate'
              : i === game.currentIndex
              ? 'current'
              : i < game.currentIndex
              ? 'celebrate'
              : false
          }
        >
          {syllable}
        </span>
      ))}

      <div className="meaning">Meaning: {game.currentMeaning}</div>
    </div>
  )
})
