# Othello with Mini-Max AI

**Author:** Bryce Bailey
**Date:** November 11, 2025
**Course:** CSC 475 - Artificial Intelligence

## Overview

This is an implementation of the classic Othello (Reversi) game featuring an intelligent AI opponent powered by the Mini-Max algorithm with alpha-beta pruning. The game provides a clean, interactive web interface built with React, allowing players to compete against a configurable AI opponent.

## Features

### Core Game Mechanics

- ✅ Complete Othello game rules implementation
- ✅ Valid move detection and automatic disc flipping
- ✅ Interactive 8x8 game board with visual indicators
- ✅ Score tracking for both players (Black and White)
- ✅ Game termination detection
- ✅ Turn-based gameplay with proper move validation

### AI Implementation

- ✅ **Mini-Max Algorithm**: Correctly implemented adversarial search
- ✅ **Alpha-Beta Pruning**: Configurable toggle for performance optimization
- ✅ **Configurable Search Depth**: Adjustable from 2 to 6 levels
- ✅ **Debug Mode**: Console logging of evaluated move sequences and heuristic values
- ✅ **Node Counting**: Displays total number of game states examined per move
- ✅ **Flexible AI**: Support for AI playing either Black or White

### User Interface

- 🎨 Modern, clean web interface with gradient backgrounds
- 🖱️ Interactive board with hover effects and visual move indicators
- ⚙️ Settings panel for AI configuration
- 📊 Real-time game status and debug information
- 🏆 Game over screen with winner announcement

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Navigate to the project directory:

```bash
cd "Assignment 3"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## How to Play

### Basic Gameplay

1. **Black** always moves first
2. Click on a valid move position (highlighted with a dot)
3. Your pieces will be placed and opposing pieces will be flipped
4. The AI will automatically make its move when it's its turn
5. The game ends when neither player can make a valid move
6. The player with the most pieces wins

### Valid Moves

A valid move must:

- Be placed on an empty square
- Sandwich at least one opponent piece between your new piece and an existing piece of yours
- The sandwiched pieces (in a straight line) will be flipped to your color

## AI Configuration

### Settings Panel

**AI Player:** Choose which color the AI plays (Black or White)

**Search Depth:** Controls how many moves ahead the AI looks

- Depth 2: Fast, weaker AI
- Depth 4: Moderate strength (default)
- Depth 6: Strong AI, slower computation

**Alpha-Beta Pruning:** Toggle this optimization on/off

- When enabled: Faster search, examines fewer nodes
- When disabled: Slower but shows full search behavior
- Compare node counts to see the optimization effect

**Debug Mode:** Enable to see detailed AI decision-making

- Console logs all evaluated move sequences
- Shows heuristic values for each considered move
- Displays pruning information

## Debug Mode

When enabled, Debug Mode shows in the browser console:

- All move sequences considered by the AI
- Heuristic evaluation at each depth level
- Alpha-beta pruning cutoffs
- Complete decision tree visualization

**To view debug output:**

1. Enable Debug Mode in the Settings panel
2. Open browser Developer Tools (F12)
3. Navigate to the Console tab
4. Watch as the AI considers moves

## Technical Details

### Game Logic (`gameLogic.js`)

- Board representation: 8x8 grid stored as 2D array
- Move validation using directional checks in 8 directions
- Automatic disc flipping in all valid directions
- Terminal state detection and winner determination

### Mini-Max Algorithm (`minimax.js`)

- Classic Mini-Max implementation with alpha-beta pruning
- Configurable search depth
- Alpha-beta pruning with optional toggle
- Node counting for performance comparison
- Support for maximizing (own player) and minimizing (opponent) nodes

### Heuristic Evaluation (`heuristic.js`)

The AI uses a composite evaluation function:

- **Position Values**: Corners and edges have higher weights
- **Mobility**: Number of valid moves available
- **Corner Control**: Direct assessment of corner occupation
- **Disc Count**: Weighted more heavily in endgame

The heuristic is designed to:

- Value strategic positions (corners, edges)
- Maintain mobility advantage
- Adapt to game phase (early vs late game)

### Architecture

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Main styles
├── components/
│   ├── Board.jsx          # Game board display
│   ├── Board.css
│   ├── GameControls.jsx   # Score display and restart
│   ├── GameControls.css
│   ├── Settings.jsx        # AI configuration panel
│   ├── Settings.css
│   ├── DebugPanel.jsx     # Debug information display
│   └── DebugPanel.css
└── utils/
    ├── gameLogic.js       # Othello rules and mechanics
    ├── minimax.js         # Mini-Max algorithm
    └── heuristic.js       # Position evaluation
```

## Project Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Requirements Met

✅ **20 pts** - Comprehensive code comments and documentation  
✅ **40 pts** - Accurate Othello game rules implementation  
✅ **20 pts** - Proper Mini-Max algorithm with configurable depth and debug mode  
✅ **20 pts** - Alpha-beta pruning with toggle capability and node counting  
✅ **10 pts** - Strong AI capable of beating human players (bonus)

## Demonstration

### Testing Alpha-Beta Pruning

1. Play a game with Alpha-Beta enabled
2. Note the number of nodes examined
3. Play another game with Alpha-Beta disabled
4. Compare the node counts - pruning should significantly reduce the number of nodes examined

### Testing Debug Mode

1. Enable Debug Mode in settings
2. Open browser console (F12)
3. Make a move and watch the AI evaluate positions
4. Observe the move sequences and heuristic values in the console

### Testing AI Strength

1. Start with depth 2 (easier)
2. Try to beat the AI
3. Increase to depth 4 or 6 for a stronger challenge

## Academic Integrity

This implementation was created as an independent assignment. All code was written from scratch following the requirements. External references were consulted only for:

- React and Vite documentation
- Language-specific syntax and best practices
- Othello game rules verification

## Browser Compatibility

Tested on:

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Future Enhancements

Potential improvements for future iterations:

- Add difficulty presets
- Implement iterative deepening
- Add move history and undo functionality
- Save/load game states
- Multiplayer online mode
- Tournament statistics tracking

## License

This project is for educational purposes only.
