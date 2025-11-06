/**
 * Game Logic for Othello
 * Handles board representation, valid move detection, and disc flipping
 */

export const EMPTY = 0;
export const BLACK = 1;
export const WHITE = 2;

const BOARD_SIZE = 8;

// 8 directions: up, down, left, right, and 4 diagonals
const DIRECTION_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],  // top row
  [0, -1],           [0, 1],   // middle row
  [1, -1],  [1, 0],  [1, 1]    // bottom row
];

/**
 * Initialize a new Othello board with the starting position
 * @returns {number[][]} 8x8 board with initial pieces
 */
export function initializeBoard() {
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));
  // Center starting position
  board[3][3] = board[4][4] = WHITE;
  board[3][4] = board[4][3] = BLACK;
  return board;
}

/**
 * Check if a move is valid for a player at the given position
 * @param {number[][]} board - Current board state
 * @param {number} row - Row of the move
 * @param {number} col - Column of the move
 * @param {number} player - Player making the move (BLACK or WHITE)
 * @returns {boolean} True if the move is valid
 */
export function isValidMove(board, row, col, player) {
  // Position must be empty
  if (board[row][col] !== EMPTY) return false;

  const opponent = player === BLACK ? WHITE : BLACK;

  // Check each direction for sandwiching pieces
  for (const [dx, dy] of DIRECTION_OFFSETS) {
    if (isDirectionValid(board, row, col, dx, dy, player, opponent)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a direction is valid for flipping pieces
 * @param {number[][]} board - Current board state
 * @param {number} row - Starting row
 * @param {number} col - Starting column
 * @param {number} dx - Row direction offset
 * @param {number} dy - Column direction offset
 * @param {number} player - Current player
 * @param {number} opponent - Opposing player
 * @returns {boolean} True if direction is valid for flipping
 */
function isDirectionValid(board, row, col, dx, dy, player, opponent) {
  let r = row + dx;
  let c = col + dy;
  let foundOpponent = false;

  // Move in the direction while there are opponent pieces
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === opponent) {
    foundOpponent = true;
    r += dx;
    c += dy;
  }

  // Must have found at least one opponent piece and ended on a friendly piece
  return foundOpponent && r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player;
}

/**
 * Get all valid moves for a player
 * @param {number[][]} board - Current board state
 * @param {number} player - Player to get moves for
 * @returns {number[][]} Array of [row, col] valid move positions
 */
export function getValidMoves(board, player) {
  const validMoves = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col]);
      }
    }
  }
  return validMoves;
}

/**
 * Make a move and flip all affected discs
 * @param {number[][]} board - Current board state
 * @param {number} row - Row of the move
 * @param {number} col - Column of the move
 * @param {number} player - Player making the move
 * @returns {number[][]} New board state after the move
 */
export function makeMove(board, row, col, player) {
  // Create a deep copy of the board
  const newBoard = board.map(row => [...row]);
  
  // Place the piece
  newBoard[row][col] = player;
  
  const opponent = player === BLACK ? WHITE : BLACK;
  
  // Flip pieces in all valid directions
  for (const [dx, dy] of DIRECTION_OFFSETS) {
    if (isDirectionValid(board, row, col, dx, dy, player, opponent)) {
      let r = row + dx;
      let c = col + dy;
      
      // Flip all opponent pieces in this direction
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && newBoard[r][c] === opponent) {
        newBoard[r][c] = player;
        r += dx;
        c += dy;
      }
    }
  }
  
  return newBoard;
}

/**
 * Check if the game is over (no valid moves for either player)
 * @param {number[][]} board - Current board state
 * @param {number} currentPlayer - Current player
 * @returns {boolean} True if the game is over
 */
export function isGameOver(board, currentPlayer) {
  const validMoves = getValidMoves(board, currentPlayer);
  if (validMoves.length > 0) {
    return false;
  }
  
  // Check if opponent has moves
  const opponent = currentPlayer === BLACK ? WHITE : BLACK;
  const opponentMoves = getValidMoves(board, opponent);
  return opponentMoves.length === 0;
}

/**
 * Calculate the score for both players
 * @param {number[][]} board - Current board state
 * @returns {{black: number, white: number}} Score object
 */
export function calculateScore(board) {
  let black = 0;
  let white = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === BLACK) black++;
      else if (board[row][col] === WHITE) white++;
    }
  }
  
  return { black, white };
}

/**
 * Get the winner of the game
 * @param {number[][]} board - Current board state
 * @returns {number|null} Winner (BLACK, WHITE) or null if tie
 */
export function getWinner(board) {
  const { black, white } = calculateScore(board);
  if (black > white) return BLACK;
  if (white > black) return WHITE;
  return null; // Tie
}

/**
 * Clone a board
 * @param {number[][]} board - Board to clone
 * @returns {number[][]} Deep copy of the board
 */
export function cloneBoard(board) {
  return board.map(row => [...row]);
}

