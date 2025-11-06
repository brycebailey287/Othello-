import React from 'react'
import './Settings.css'
import { BLACK, WHITE } from '../utils/gameLogic'

/**
 * Settings Component
 * Allows configuration of AI settings and player types
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.aiBlack - Whether Black player is AI
 * @param {boolean} props.aiWhite - Whether White player is AI
 * @param {Function} props.onAiBlackChange - Callback when Black AI setting changes
 * @param {Function} props.onAiWhiteChange - Callback when White AI setting changes
 * @param {Function} props.onRestart - Callback to restart the game
 * @param {number} props.searchDepth - Current search depth
 * @param {Function} props.onDepthChange - Callback when depth changes
 * @param {boolean} props.alphaBetaEnabled - Whether alpha-beta is enabled
 * @param {Function} props.onAlphaBetaToggle - Callback to toggle alpha-beta
 * @param {boolean} props.debugMode - Whether debug mode is enabled
 * @param {Function} props.onDebugModeToggle - Callback to toggle debug mode
 */
function Settings({
  aiBlack,
  aiWhite,
  onAiBlackChange,
  onAiWhiteChange,
  onRestart,
  searchDepth,
  onDepthChange,
  alphaBetaEnabled,
  onAlphaBetaToggle,
  debugMode,
  onDebugModeToggle
}) {
  /**
   * Handle player type change and restart game
   */
  const handlePlayerTypeChange = (player, isAI) => {
    if (player === BLACK) {
      onAiBlackChange(isAI)
    } else {
      onAiWhiteChange(isAI)
    }
    // Restart game when player type changes
    setTimeout(() => onRestart(), 0)
  }

  return (
    <div className="settings-panel">
      <h2>Game Settings</h2>
      
      <div className="setting-group">
        <label className="setting-label">
          Black Player:
          <select 
            value={aiBlack ? 'ai' : 'human'}
            onChange={(e) => handlePlayerTypeChange(BLACK, e.target.value === 'ai')}
            className="setting-select"
          >
            <option value="human">Human</option>
            <option value="ai">AI</option>
          </select>
        </label>
      </div>
      
      <div className="setting-group">
        <label className="setting-label">
          White Player:
          <select 
            value={aiWhite ? 'ai' : 'human'}
            onChange={(e) => handlePlayerTypeChange(WHITE, e.target.value === 'ai')}
            className="setting-select"
          >
            <option value="human">Human</option>
            <option value="ai">AI</option>
          </select>
        </label>
      </div>
      
      <div className="setting-group">
        <label className="setting-label">
          Search Depth: {searchDepth}
          <input
            type="range"
            min="2"
            max="6"
            value={searchDepth}
            onChange={(e) => onDepthChange(parseInt(e.target.value))}
            className="setting-slider"
          />
          <div className="slider-labels">
            <span>2</span>
            <span>6</span>
          </div>
        </label>
      </div>
      
      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={alphaBetaEnabled}
            onChange={(e) => onAlphaBetaToggle(e.target.checked)}
            className="setting-checkbox"
          />
          <span>Alpha-Beta Pruning</span>
        </label>
      </div>
      
      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={(e) => onDebugModeToggle(e.target.checked)}
            className="setting-checkbox"
          />
          <span>Debug Mode (Console)</span>
        </label>
      </div>
      
      <div className="setting-note">
        <p>Increase depth for stronger AI. Higher depths take longer to compute.</p>
        <p style={{ marginTop: '8px', fontSize: '0.85em', color: '#888' }}>
          {!aiBlack && !aiWhite && 'Human vs Human mode'}
          {aiBlack && !aiWhite && 'AI vs Human mode'}
          {!aiBlack && aiWhite && 'Human vs AI mode'}
          {aiBlack && aiWhite && 'AI vs AI mode'}
        </p>
      </div>
    </div>
  )
}

export default Settings

