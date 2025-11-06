import React from 'react'
import './Board.css'
import { EMPTY, BLACK, WHITE, isValidMove, getValidMoves } from '../utils/gameLogic'

/**
 * Board Component
 * Displays the Othello game board with pieces and valid move indicators
 * 
 * @param {Object} props - Component props
 * @param {number[][]} props.board - Current board state
 * @param {number} props.currentPlayer - Current player (BLACK or WHITE)
 * @param {Function} props.onMove - Callback when a move is made
 * @param {boolean} props.gameOver - Whether the game is over
 */
function Board({ board, currentPlayer, onMove, gameOver }) {
  /**
   * Handle a click on a cell
   * @param {number} row - Row of the clicked cell
   * @param {number} col - Column of the clicked cell
   */
  const handleCellClick = (row, col) => {
    if (!gameOver && isValidMove(board, row, col, currentPlayer)) {
      onMove(row, col)
    }
  }

  /**
   * Get all valid moves for the current player
   */
  const validMoves = getValidMoves(board, currentPlayer)
  
  // Create a set for O(1) lookup
  const validMovesSet = new Set(validMoves.map(([r, c]) => `${r},${c}`))

  /**
   * Get cell class name based on its state
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @returns {string} CSS class name
   */
  const getCellClassName = (row, col) => {
    let className = 'cell'
    const piece = board[row][col]
    
    if (piece === BLACK) className += ' black'
    else if (piece === WHITE) className += ' white'
    else if (validMovesSet.has(`${row},${col}`)) className += ' valid-move'
    
    return className
  }

  /**
   * Render a single cell
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @returns {JSX.Element} Cell element
   */
  const renderCell = (row, col) => {
    const isBlack = board[row][col] === BLACK
    const isWhite = board[row][col] === WHITE
    const isValid = validMovesSet.has(`${row},${col}`)
    
    return (
      <div
        key={`${row}-${col}`}
        className={getCellClassName(row, col)}
        onClick={() => handleCellClick(row, col)}
      >
        {isBlack && <div className="piece black-piece" />}
        {isWhite && <div className="piece white-piece" />}
        {isValid && !gameOver && <div className="valid-move-indicator" />}
      </div>
    )
  }

  return (
    <div className="board">
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board

