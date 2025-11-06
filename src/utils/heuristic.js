/**
 * Heuristic Evaluation Function for Othello
 * Evaluates a board position and returns a score
 * Positive scores favor the current player, negative favor the opponent
 */

import { EMPTY, BLACK, WHITE } from './gameLogic.js';
import { getValidMoves } from './gameLogic.js';

const BOARD_SIZE = 8;

// Position weights for evaluation
// Corners and edges are important in Othello
const POSITION_WEIGHTS = [
  [ 100, -20,  10,   5,   5,  10, -20, 100],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [ 10,  -5,   5,   2,   2,   5,  -5,  10],
  [  5,  -5,   2,   0,   0,   2,  -5,   5],
  [  5,  -5,   2,   0,   0,   2,  -5,   5],
  [ 10,  -5,   5,   2,   2,   5,  -5,  10],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [ 100, -20,  10,   5,   5,  10, -20, 100]
];

// Corners
const CORNERS = [[0, 0], [0, 7], [7, 0], [7, 7]];

// X-squares adjacent to corners (dangerous positions)
const X_SQUARES = [[1, 1], [1, 6], [6, 1], [6, 6]];

// C-squares adjacent to corners on edges
const C_SQUARES = [[0, 1], [0, 6], [1, 0], [1, 7], [6, 0], [6, 7], [7, 1], [7, 6]];

/**
 * Evaluate a board position
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to evaluate for (BLACK or WHITE)
 * @returns {number} Heuristic score (positive favors player)
 */
export function evaluatePosition(board, player) {
  const opponent = player === BLACK ? WHITE : BLACK;
  
  let score = 0;
  
  // Position weights (piece placement evaluation)
  score += getPositionScore(board, player) - getPositionScore(board, opponent);
  
  // Mobility (number of valid moves available)
  const playerMoves = getValidMoves(board, player).length;
  const opponentMoves = getValidMoves(board, opponent).length;
  
  if (playerMoves + opponentMoves > 0) {
    score += (playerMoves - opponentMoves) * 5;
  }
  
  // Corner control
  const cornerDiff = getCornerScore(board, player) - getCornerScore(board, opponent);
  score += cornerDiff * 30;
  
  // Disc count (less important early, more important late)
  const discDiff = getDiscDifference(board, player, opponent);
  const totalPieces = countPieces(board);
  
  // Weight disc difference more as game progresses
  if (totalPieces > 45) {
    score += discDiff * 10; // End game
  } else {
    score += discDiff * 2;  // Early/mid game
  }
  
  return score;
}

/**
 * Get position-based score for a player
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to evaluate
 * @returns {number} Position score
 */
function getPositionScore(board, player) {
  let score = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === player) {
        score += POSITION_WEIGHTS[row][col];
      }
    }
  }
  return score;
}

/**
 * Get corner score for a player
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to evaluate
 * @returns {number} Corner score
 */
function getCornerScore(board, player) {
  let count = 0;
  for (const [row, col] of CORNERS) {
    if (board[row][col] === player) count++;
  }
  return count;
}

/**
 * Get the difference in number of discs
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to evaluate
 * @param {number} opponent - Opposing player
 * @returns {number} Disc difference
 */
function getDiscDifference(board, player, opponent) {
  let playerCount = 0;
  let opponentCount = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === player) playerCount++;
      else if (board[row][col] === opponent) opponentCount++;
    }
  }
  
  return playerCount - opponentCount;
}

/**
 * Count total pieces on the board
 * @param {number[][]} board - Current board state
 * @returns {number} Total number of pieces
 */
function countPieces(board) {
  let count = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== EMPTY) count++;
    }
  }
  return count;
}

