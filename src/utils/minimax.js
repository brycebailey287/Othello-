/**
 * Mini-Max Algorithm with Alpha-Beta Pruning for Othello
 * Implements the classic adversarial search algorithm
 */

import { BLACK, WHITE, EMPTY } from './gameLogic.js';
import { getValidMoves, makeMove, isGameOver, getWinner } from './gameLogic.js';
import { evaluatePosition } from './heuristic.js';

let nodesExamined = 0;
let alphaBetaEnabled = true;
let debugMode = false;

/**
 * Set whether alpha-beta pruning is enabled
 * @param {boolean} enabled - Whether to enable alpha-beta pruning
 */
export function setAlphaBeta(enabled) {
  alphaBetaEnabled = enabled;
}

/**
 * Set whether debug mode is enabled
 * @param {boolean} enabled - Whether to enable debug mode
 */
export function setDebugMode(enabled) {
  debugMode = enabled;
}

/**
 * Get the number of nodes examined in the last search
 * @returns {number} Number of nodes examined
 */
export function getNodesExamined() {
  return nodesExamined;
}

/**
 * Find the best move using Mini-Max algorithm
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to find move for
 * @param {number} depth - Search depth
 * @param {boolean} useAlphaBeta - Whether to use alpha-beta pruning
 * @returns {{row: number, col: number, score: number}} Best move and its score
 */
export function findBestMove(board, player, depth, useAlphaBeta = true) {
  nodesExamined = 0;
  
  const validMoves = getValidMoves(board, player);
  
  // No valid moves available
  if (validMoves.length === 0) {
    return { row: -1, col: -1, score: null };
  }
  
  // Find best move for maximizing player
  let bestMove = { row: -1, col: -1, score: -Infinity };
  let alpha = -Infinity;
  let beta = Infinity;
  
  for (const [row, col] of validMoves) {
    const newBoard = makeMove(board, row, col, player);
    const score = minimax(
      newBoard,
      player === BLACK ? WHITE : BLACK, // opponent
      depth - 1,
      false, // minimize (opponent's turn)
      player, // original player for maximization
      alpha,
      beta,
      [{ move: [row, col], depth: depth }]
    );
    
    if (debugMode) {
      console.log(`Considering move [${row}, ${col}]: score = ${score}`);
    }
    
    if (score > bestMove.score) {
      bestMove = { row, col, score };
    }
    
    if (useAlphaBeta) {
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        if (debugMode) {
          console.log(`Alpha-beta cutoff at depth ${depth}`);
        }
        break; // Pruned
      }
    }
  }
  
  return bestMove;
}

/**
 * Mini-Max algorithm implementation with alpha-beta pruning
 * @param {number[][]} board - Current board state
 * @param {number} currentPlayer - Current player to move
 * @param {number} depth - Remaining search depth
 * @param {boolean} maximizing - Whether this is a maximizing or minimizing node
 * @param {number} originalPlayer - The player we're trying to maximize for
 * @param {number} alpha - Best value for maximizing player
 * @param {number} beta - Best value for minimizing player
 * @param {Array} moveSequence - Sequence of moves taken (for debug)
 * @returns {number} Heuristic score of the position
 */
function minimax(board, currentPlayer, depth, maximizing, originalPlayer, alpha, beta, moveSequence) {
  nodesExamined++;
  
  // Terminal conditions
  const gameEnded = isGameOver(board, currentPlayer);
  
  if (gameEnded || depth === 0) {
    const winner = getWinner(board);
    
    if (gameEnded) {
      // Terminal state
      if (winner === originalPlayer) {
        return 10000; // Win
      } else if (winner === (originalPlayer === BLACK ? WHITE : BLACK)) {
        return -10000; // Loss
      } else {
        return 0; // Tie
      }
    }
    
    // Depth limit reached, evaluate position
    return evaluatePosition(board, originalPlayer);
  }
  
  const validMoves = getValidMoves(board, currentPlayer);
  
  // If no valid moves, pass turn to opponent
  if (validMoves.length === 0) {
    const opponent = currentPlayer === BLACK ? WHITE : BLACK;
    return minimax(board, opponent, depth - 1, !maximizing, originalPlayer, alpha, beta, moveSequence);
  }
  
  if (maximizing) {
    let maxEval = -Infinity;
    
    for (const [row, col] of validMoves) {
      const newBoard = makeMove(board, row, col, currentPlayer);
      const newSequence = [...moveSequence, { move: [row, col], depth: depth - 1 }];
      
      if (debugMode && moveSequence.length < 2) {
        console.log(`  ${'  '.repeat(moveSequence.length)}Max at depth ${depth}: [${row}, ${col}]`);
      }
      
      const score = minimax(
        newBoard,
        currentPlayer === BLACK ? WHITE : BLACK,
        depth - 1,
        false,
        originalPlayer,
        alpha,
        beta,
        newSequence
      );
      
      maxEval = Math.max(maxEval, score);
      
      if (alphaBetaEnabled) {
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          if (debugMode) {
            console.log(`  ${'  '.repeat(moveSequence.length)}Pruned at depth ${depth}`);
          }
          break; // Beta cutoff
        }
      }
    }
    
    return maxEval;
  } else {
    let minEval = Infinity;
    
    for (const [row, col] of validMoves) {
      const newBoard = makeMove(board, row, col, currentPlayer);
      const newSequence = [...moveSequence, { move: [row, col], depth: depth - 1 }];
      
      if (debugMode && moveSequence.length < 2) {
        console.log(`  ${'  '.repeat(moveSequence.length)}Min at depth ${depth}: [${row}, ${col}]`);
      }
      
      const score = minimax(
        newBoard,
        currentPlayer === BLACK ? WHITE : BLACK,
        depth - 1,
        true,
        originalPlayer,
        alpha,
        beta,
        newSequence
      );
      
      minEval = Math.min(minEval, score);
      
      if (alphaBetaEnabled) {
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          if (debugMode) {
            console.log(`  ${'  '.repeat(moveSequence.length)}Pruned at depth ${depth}`);
          }
          break; // Alpha cutoff
        }
      }
    }
    
    return minEval;
  }
}

