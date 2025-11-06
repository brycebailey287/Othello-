import React from 'react'
import './DebugPanel.css'
import { BLACK, WHITE } from '../utils/gameLogic'

/**
 * Debug Panel Component
 * Displays game state information and debug data
 * 
 * @param {Object} props - Component props
 * @param {number} props.nodesExamined - Number of nodes examined in last search
 * @param {number} props.currentPlayer - Current player
 * @param {Object} props.scores - Current scores
 * @param {boolean} props.gameOver - Whether game is over
 * @param {number|null} props.winner - Winner of the game
 */
function DebugPanel({ nodesExamined, currentPlayer, scores, gameOver, winner }) {
  /**
   * Get winner message
   * @returns {string} Winner message
   */
  const getWinnerMessage = () => {
    if (!gameOver) return ''
    
    if (winner === BLACK) return 'Black wins!'
    if (winner === WHITE) return 'White wins!'
    return "It's a tie!"
  }

  /**
   * Get game status message
   * @returns {string} Status message
   */
  const getGameStatus = () => {
    if (gameOver) {
      return 'Game Over'
    }
    return `Player ${currentPlayer === BLACK ? 'Black' : 'White'}'s Turn`
  }

  return (
    <div className="debug-panel">
      <h2>Game Status</h2>
      
      <div className="status-section">
        <div className="status-item">
          <span className="status-label">Status:</span>
          <span className="status-value">{getGameStatus()}</span>
        </div>
        
        {gameOver && (
          <div className="winner-message">
            <strong>{getWinnerMessage()}</strong>
          </div>
        )}
      </div>
      
      <div className="metrics-section">
        <h3>AI Metrics</h3>
        <div className="metric-item">
          <span className="metric-label">Nodes Examined:</span>
          <span className="metric-value">{nodesExamined.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="info-section">
        <h3>Game Info</h3>
        <div className="info-item">
          <span>Total Pieces:</span>
          <span className="info-value">{scores.black + scores.white}</span>
        </div>
        <div className="info-item">
          <span>Empty Squares:</span>
          <span className="info-value">{64 - scores.black - scores.white}</span>
        </div>
      </div>
      
      <div className="console-note">
        <p>💡 Check the browser console for detailed move sequences when Debug Mode is enabled.</p>
      </div>
    </div>
  )
}

export default DebugPanel

