# Rock Paper Scissors

A browser-based Rock Paper Scissors game with a name-entry flow, two game modes (vs Computer or vs a Friend on the same device), a "Rock… Paper… Scissors… Shoot!" countdown animation, and score tracking. 

## Features

- **Name entry** — enter your name before playing.
- **Two modes**
  - **vs Computer** — the computer picks randomly (`Math.random()`) each round.
  - **vs Friend** — local pass-and-play. Player 1 locks in a move privately, a "pass the device" screen hides it, then Player 2 picks before both are revealed together.
- **Animated reveal** — both hands cycle through random gestures during a countdown before settling on the real picks.
- **Score tracking** with a reset option.
- **Custom rotating background loader**, pixel-style font, and a dark arcade-inspired UI.

## File structure

```
rock-paper-scissor-game/
├── index.html
├── style.css    
├── script.js
└── README.md    
```

## Running it locally

No installation required.

1. Download/clone the folder so `index.html`, `style.css`, and `script.js` are together in the same directory.
2. Double-click `index.html` to open it in your browser.


## Tech

- HTML5
- CSS3 (custom properties, keyframe animations, flexbox)
- Vanilla JavaScript (no dependencies)
- [Silkscreen](https://fonts.google.com/specimen/Silkscreen) font via Google Fonts

## License

Free to use and modify.
