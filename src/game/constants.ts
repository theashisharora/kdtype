import SANSKRIT_WORDS from './words/sanskrit-words.json'

export const GAME_EVENTS = [
  'game_start',
  'game_reset',
  'state_change',
  'input_wrong',
  'input_right',
  'word_start',
  'word_complete',
] as const

export const ALL_WORDS = SANSKRIT_WORDS.map((entry) => ({
  word: entry.word,
  pronunciation: entry.pronunciation.toLowerCase(),
  meaning: entry.meaning,
}))

/**
 * A mapping of game events to Audio elements used to play sound effects.
 * To create a new sound effect, create a new file in public/audio.
 */
export const EVENT_SOUNDS: Record<typeof GAME_EVENTS[number], HTMLAudioElement | null> = {
  game_start: null,
  game_reset: null,
  state_change: null,
  input_wrong: null,
  input_right: new Audio(`audio/input_right.mp3`),
  word_start: null,
  word_complete: new Audio(`audio/word_complete.mp3`),
}
