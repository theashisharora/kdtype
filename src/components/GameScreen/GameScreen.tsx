import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useGame } from '~hooks/useGameContext'
import { useSoundEffects } from '~hooks/useSoundEffects'
import { Celebration } from '~components/Celebration'
import { CurrentWord } from '~components/CurrentWord'
import { Settings } from '~components/Settings'

export const GameScreen = observer(function GameScreen() {
  const { game } = useGame()

  useSoundEffects()

  const handlePointerDown = React.useCallback(() => {
    game.dispatch({ type: 'click' })
  }, [game])

  // Temporary... after a pause, start the first word
  React.useEffect(() => {
    const handleGameStart = () => {
      setTimeout(() => {
        game.dispatch({ type: 'ui_ready' })
      }, 750)
    }

    game.once('game_start', handleGameStart)
    return () => {
      game.off('game_start', handleGameStart)
    }
  }, [game.state])

  return (
    <div className={`game`} data-state={game.state} onPointerDown={handlePointerDown}>
      <Settings />
      <div className="score">Score: {game.score}</div> {/* Display the score */}
      <div className="timer">Time: {game.remainingTime}s</div> {/* Display the timer */}
      {game.state === 'game_over' && <div className="game-over">Game Over</div>}{' '}
      {/* Display game over message */}
      <CurrentWord />
      <Celebration />
    </div>
  )
})
