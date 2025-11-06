import React from 'react'
import './GameControls.css'
import { BLACK, WHITE } from '../utils/gameLogic'

/**
 * Game Controls Component
 * Displays game status and restart button
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onRestart - Callback to restart the game
 * @param {Object} props.scores - Current scores {black, white}
 * @param {number} props.currentPlayer - Current player to move
 * @param {boolean} props.isAiThinking - Whether the AI is currently thinking
 */
function GameControls({ onRestart, scores, currentPlayer, isAiThinking }) {
  /**
   * Get the name of the player
   * @param {number} player - Player identifier
   * @returns {string} Player name
   */
  const getPlayerName = (player) => {
    return player === BLACK ? 'Black' : 'White'
  }

  /**
   * Get the current player's display
   * @returns {string} Current player message
   */
  const getCurrentPlayerDisplay = () => {
    return `Current Turn: ${getPlayerName(currentPlayer)}`
  }

  return (
    <div className="game-controls">
      <div className="score-display">
        <div className="score-item black-score">
          <span className="score-label">Black:</span>
          <span className="score-value">{scores.black}</span>
        </div>
        <div className="score-item white-score">
          <span className="score-label">White:</span>
          <span className="score-value">{scores.white}</span>
        </div>
      </div>
      
      <div className="current-player">
        {isAiThinking ? (
          <div className="ai-thinking">
            <span className="thinking-spinner"></span>
            <span>AI is thinking...</span>
          </div>
        ) : (
          getCurrentPlayerDisplay()
        )}
      </div>
      
      <button 
        className="restart-button"
        onClick={onRestart}
      >
        New Game
      </button>
    </div>
  )
}

export default GameControls

