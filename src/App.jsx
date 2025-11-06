import React, { useState, useEffect } from 'react'
import Board from './components/Board'
import GameControls from './components/GameControls'
import Settings from './components/Settings'
import DebugPanel from './components/DebugPanel'
import { BLACK, WHITE, initializeBoard, makeMove as makeGameMove, isGameOver, getValidMoves, calculateScore, isValidMove, getWinner } from './utils/gameLogic'
import { findBestMove, setAlphaBeta, setDebugMode as setDebug, getNodesExamined } from './utils/minimax'
import './App.css'

/**
 * Main Application Component for Othello Game
 * 
 * @author Student Name
 * @date 2024
 * 
 * This is an implementation of the Othello game with an intelligent AI opponent
 * using the Mini-Max algorithm with alpha-beta pruning. Players can configure
 * the AI's search depth, toggle alpha-beta pruning, and enable debug mode to
 * see the decision-making process.
 */

function App() {
  const [board, setBoard] = useState(initializeBoard())
  const [currentPlayer, setCurrentPlayer] = useState(BLACK)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [aiBlack, setAiBlack] = useState(false) // Black player is human by default
  const [aiWhite, setAiWhite] = useState(true) // White player is AI by default
  const [searchDepth, setSearchDepth] = useState(4)
  const [alphaBetaEnabled, setAlphaBetaEnabled] = useState(true)
  const [debugMode, setDebugMode] = useState(false)
  const [nodesExamined, setNodesExamined] = useState(0)
  const [isAiThinking, setIsAiThinking] = useState(false)

  /**
   * Reset the game to initial state
   */
  const restartGame = () => {
    setBoard(initializeBoard())
    setCurrentPlayer(BLACK)
    setGameOver(false)
    setWinner(null)
    setNodesExamined(0)
    setIsAiThinking(false)
  }

  /**
   * Check if the current player is AI-controlled
   */
  const isCurrentPlayerAI = () => {
    if (currentPlayer === BLACK) return aiBlack
    if (currentPlayer === WHITE) return aiWhite
    return false
  }

  /**
   * Make a move on the board
   * @param {number} row - Row of the move
   * @param {number} col - Column of the move
   */
  const handleMove = (row, col) => {
    // Only allow human moves if the current player is not AI-controlled
    if (!gameOver && !isCurrentPlayerAI()) {
      if (isValidMove(board, row, col, currentPlayer)) {
        const newBoard = makeGameMove(board, row, col, currentPlayer)
        setBoard(newBoard)
        switchTurn(newBoard, currentPlayer === BLACK ? WHITE : BLACK)
      }
    }
  }

  /**
   * Switch to the next player's turn
   * @param {number[][]} newBoard - The new board state
   * @param {number} nextPlayer - The next player to move
   */
  const switchTurn = (newBoard, nextPlayer) => {
    // Check if game is over
    if (isGameOver(newBoard, nextPlayer)) {
      const gameWinner = getWinner(newBoard)
      setGameOver(true)
      setWinner(gameWinner)
      return
    }

    setCurrentPlayer(nextPlayer)
  }

  /**
   * Handle AI's turn
   */
  useEffect(() => {
    if (!gameOver && isCurrentPlayerAI()) {
      const makeAiMove = async () => {
        setIsAiThinking(true)
        setAlphaBeta(alphaBetaEnabled)
        setDebug(debugMode)
        
        // Calculate the best move
        const bestMove = findBestMove(board, currentPlayer, searchDepth, alphaBetaEnabled)
        const nodes = getNodesExamined()
        setNodesExamined(nodes)
        
        if (bestMove.row !== -1 && bestMove.col !== -1) {
          // Add delay to make it look like the AI is thinking
          // Minimum 800ms, scales with search depth for more realistic feel
          const thinkingDelay = Math.max(800, searchDepth * 200)
          
          setTimeout(() => {
            const newBoard = makeGameMove(board, bestMove.row, bestMove.col, currentPlayer)
            setBoard(newBoard)
            setIsAiThinking(false)
            switchTurn(newBoard, currentPlayer === BLACK ? WHITE : BLACK)
          }, thinkingDelay)
        } else {
          setIsAiThinking(false)
        }
      }
      
      makeAiMove()
    }
  }, [board, currentPlayer, gameOver, searchDepth, alphaBetaEnabled, debugMode, aiBlack, aiWhite])

  const scores = calculateScore(board)

  return (
    <div className="app">
      <div className="game-container">
        <div className="game-header">
          <h1>Othello with Mini-Max AI</h1>
          <GameControls 
            onRestart={restartGame}
            scores={scores}
            currentPlayer={currentPlayer}
            isAiThinking={isAiThinking}
          />
        </div>
        
        <div className="game-content">
          <div className="left-panel">
            <Settings
              aiBlack={aiBlack}
              aiWhite={aiWhite}
              onAiBlackChange={setAiBlack}
              onAiWhiteChange={setAiWhite}
              onRestart={restartGame}
              searchDepth={searchDepth}
              onDepthChange={setSearchDepth}
              alphaBetaEnabled={alphaBetaEnabled}
              onAlphaBetaToggle={setAlphaBetaEnabled}
              debugMode={debugMode}
              onDebugModeToggle={setDebugMode}
            />
            <DebugPanel 
              nodesExamined={nodesExamined}
              currentPlayer={currentPlayer}
              scores={scores}
              gameOver={gameOver}
              winner={winner}
            />
          </div>
          
          <div className="board-container">
            <Board 
              board={board}
              currentPlayer={currentPlayer}
              onMove={handleMove}
              gameOver={gameOver}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

