(function () {
  const root = document.getElementById('app-root');

  const screenStart = root.querySelector('#screen-start');
  const screenPass = root.querySelector('#screen-pass');
  const screenGame = root.querySelector('#screen-game');

  const input1 = root.querySelector('#input-name1');
  const modeComputerBtn = root.querySelector('#mode-computer');
  const modeFriendBtn = root.querySelector('#mode-friend');
  const friendBlock = root.querySelector('#friend-name-block');
  const input2 = root.querySelector('#input-name2');
  const startBtn = root.querySelector('#start-match-btn');

  const passCopy = root.querySelector('#pass-copy');
  const passReadyBtn = root.querySelector('#pass-ready-btn');

  const p1Tag = root.querySelector('#p1-tag');
  const p2Tag = root.querySelector('#p2-tag');
  const p1ScoreEl = root.querySelector('#p1-score');
  const p2ScoreEl = root.querySelector('#p2-score');
  const callout = root.querySelector('#callout');
  const p1Hand = root.querySelector('#p1-hand');
  const p2Hand = root.querySelector('#p2-hand');
  const p1Wrap = root.querySelector('#p1-wrap');
  const p2Wrap = root.querySelector('#p2-wrap');
  const turnLabel = root.querySelector('#turn-label');
  const resultLine = root.querySelector('#result-line');
  const pickButtons = Array.from(root.querySelectorAll('.pick-btn'));
  const resetBtn = root.querySelector('#reset-btn');
  const newPlayersBtn = root.querySelector('#new-players-btn');

  const CHOICES = ['rock', 'paper', 'scissors'];
  const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  const ICON = { rock: '✊', paper: '✋', scissors: '✌️' };

  const state = { mode: null, p1: '', p2: '', score: { p1: 0, p2: 0 }, pendingP1: null, busy: false };

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }
  function setPicksDisabled(disabled) { pickButtons.forEach(b => b.disabled = disabled); }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function setGesture(handEl, g) {
    handEl.textContent = ICON[g];
    handEl.classList.remove('winner', 'loser');
  }
  function bump(wrapEl) { wrapEl.classList.remove('bump'); void wrapEl.offsetWidth; wrapEl.classList.add('bump'); }

  function selectMode(mode) {
    state.mode = mode;
    modeComputerBtn.classList.toggle('selected', mode === 'computer');
    modeFriendBtn.classList.toggle('selected', mode === 'friend');
    if (mode === 'friend') { show(friendBlock); } else { hide(friendBlock); }
    show(startBtn);
  }
  modeComputerBtn.addEventListener('click', () => selectMode('computer'));
  modeFriendBtn.addEventListener('click', () => selectMode('friend'));

  startBtn.addEventListener('click', () => {
    state.p1 = input1.value.trim() || 'Player 1';
    state.p2 = state.mode === 'friend' ? (input2.value.trim() || 'Player 2') : 'Computer';
    state.score = { p1: 0, p2: 0 };
    p1Tag.textContent = state.p1.toUpperCase();
    p2Tag.textContent = state.p2.toUpperCase();
    p1ScoreEl.textContent = 0;
    p2ScoreEl.textContent = 0;
    hide(screenStart);
    show(screenGame);
    beginTurn();
  });

  newPlayersBtn.addEventListener('click', () => {
    state.mode = null;
    modeComputerBtn.classList.remove('selected');
    modeFriendBtn.classList.remove('selected');
    hide(friendBlock);
    hide(startBtn);
    input1.value = ''; input2.value = '';
    hide(screenGame);
    show(screenStart);
  });

  resetBtn.addEventListener('click', () => {
    if (state.busy) return;
    state.score = { p1: 0, p2: 0 };
    p1ScoreEl.textContent = 0;
    p2ScoreEl.textContent = 0;
    beginTurn();
  });

  function beginTurn() {
    state.pendingP1 = null;
    setGesture(p1Hand, 'rock');
    setGesture(p2Hand, 'rock');
    callout.textContent = 'READY';
    resultLine.classList.remove('win', 'lose');
    resultLine.textContent = 'Pick a move to start the round';
    turnLabel.textContent = state.mode === 'friend' ? (state.p1 + "'s turn — choose in secret") : '\u00A0';
    setPicksDisabled(false);
  }

  pickButtons.forEach(btn => btn.addEventListener('click', () => onChoice(btn.dataset.choice)));

  function onChoice(choice) {
    if (state.busy) return;
    if (state.mode === 'computer') { runComputerRound(choice); }
    else { runFriendRound(choice); }
  }

  function runComputerRound(playerChoice) {
    state.busy = true;
    setPicksDisabled(true);
    resultLine.classList.remove('win', 'lose');
    resultLine.textContent = '\u00A0';
    shakeSequence(() => finishRound(playerChoice, CHOICES[Math.floor(Math.random() * 3)]));
  }

  function runFriendRound(choice) {
    if (state.pendingP1 === null) {
      state.pendingP1 = choice;
      setPicksDisabled(true);
      passCopy.textContent = state.p1 + ' has locked in a move. Hand the device to ' + state.p2 + '.';
      passReadyBtn.textContent = "I'M " + state.p2.toUpperCase() + ', READY';
      hide(screenGame);
      show(screenPass);
    } else {
      hide(screenPass);
      show(screenGame);
      state.busy = true;
      setPicksDisabled(true);
      turnLabel.textContent = '\u00A0';
      resultLine.classList.remove('win', 'lose');
      resultLine.textContent = '\u00A0';
      shakeSequence(() => finishRound(state.pendingP1, choice));
    }
  }

  passReadyBtn.addEventListener('click', () => {
    hide(screenPass);
    show(screenGame);
    turnLabel.textContent = state.p2 + "'s turn — choose in secret";
    setPicksDisabled(false);
  });

  function shakeSequence(onDone) {
    const beats = ['ROCK', 'PAPER', 'SCISSORS', 'SHOOT!'];
    let i = 0;
    const tick = () => {
      callout.textContent = beats[i];
      bump(p1Wrap); bump(p2Wrap);
      if (i < beats.length - 1) {
        setGesture(p1Hand, CHOICES[Math.floor(Math.random() * 3)]);
        setGesture(p2Hand, CHOICES[Math.floor(Math.random() * 3)]);
      }
      i++;
      if (i < beats.length) { setTimeout(tick, 320); } else { onDone(); }
    };
    tick();
  }

  function finishRound(p1Choice, p2Choice) {
    setGesture(p1Hand, p1Choice);
    setGesture(p2Hand, p2Choice);

    let outcome;
    if (p1Choice === p2Choice) outcome = 'tie';
    else if (BEATS[p1Choice] === p2Choice) outcome = 'p1';
    else outcome = 'p2';

    setTimeout(() => {
      if (outcome === 'p1') {
        state.score.p1++;
        callout.textContent = state.p1.toUpperCase() + ' WINS';
        resultLine.textContent = capitalize(p1Choice) + ' ' + ICON[p1Choice] + ' beats ' + p2Choice + ' ' + ICON[p2Choice] + ' — round to ' + state.p1 + '.';
        resultLine.classList.add('win');
        p1Hand.classList.add('winner'); p2Hand.classList.add('loser');
      } else if (outcome === 'p2') {
        state.score.p2++;
        callout.textContent = state.p2.toUpperCase() + ' WINS';
        resultLine.textContent = capitalize(p2Choice) + ' ' + ICON[p2Choice] + ' beats ' + p1Choice + ' ' + ICON[p1Choice] + ' — round to ' + state.p2 + '.';
        resultLine.classList.add('lose');
        p2Hand.classList.add('winner'); p1Hand.classList.add('loser');
      } else {
        callout.textContent = 'TIE';
        resultLine.textContent = 'Both picked ' + p1Choice + ' ' + ICON[p1Choice] + ' — run it back.';
      }
      p1ScoreEl.textContent = state.score.p1;
      p2ScoreEl.textContent = state.score.p2;
      state.busy = false;
      setTimeout(beginTurn, 1400);
    }, 260);
  }
})();
