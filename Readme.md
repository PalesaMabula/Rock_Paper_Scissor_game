# Rock Paper Scissors

A browser-based Rock Paper Scissors game with a name-entry flow, two game modes (vs Computer or vs a Friend on the same device), a "Rock… Paper… Scissors… Shoot!" countdown animation, and score tracking. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

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
├── index.html   # Page structure — the three screens (name entry, pass-device, game)
├── style.css    # All styling: theme, layout, animations, responsive rules
├── script.js    # Game logic: state, event handlers, round/animation flow
└── README.md    # This file
```

## Running it locally

No installation required.

1. Download/clone the folder so `index.html`, `style.css`, and `script.js` are together in the same directory.
2. Double-click `index.html` to open it in your browser.

That's it — everything runs client-side.

**Optional (for live-reload while editing):** install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code, then right-click `index.html` → **Open with Live Server**.

## Tech

- HTML5
- CSS3 (custom properties, keyframe animations, flexbox)
- Vanilla JavaScript (no dependencies)
- [Silkscreen](https://fonts.google.com/specimen/Silkscreen) font via Google Fonts

## License

Free to use and modify.