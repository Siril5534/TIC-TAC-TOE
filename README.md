# Tic-Tac-Toe

A clean, responsive Tic-Tac-Toe game for two people sharing a screen. Play a quick match, see the winning line, and keep score across rounds.

## Features

- Local two-player gameplay with alternating X and O turns
- Automatic win and draw detection, with the winning squares highlighted
- Scoreboard for Player One, Player Two, and draws
- New Game keeps the scores; Reset Score clears the scoreboard and starts a fresh round
- Responsive layout, keyboard-friendly controls, visible focus, and screen-reader status updates
- No build step, package installation, or framework required

## Play

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.
3. Players take turns selecting an empty square. X goes first.
4. Get three marks in a horizontal, vertical, or diagonal line to win. If all nine squares fill without a winner, the round is a draw.
5. Choose **New game** to play another round, or **Reset score** to start over completely.

Alternatively, serve the repository directory with any static web server and open its local URL. The game itself works without a server; the optional Google Fonts import falls back to system fonts when offline.

## Project files

- `index.html` — accessible page structure and game controls
- `styles.css` — responsive visual design and interaction states
- `script.js` — turn handling, win/draw rules, and score tracking

## Technology

Built with semantic HTML, CSS, and vanilla JavaScript. No dependencies or build tools are needed.