
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
}; // alternative to below commented code

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const player = pickComp();
      playGame(player);
    }, 1000);
    document.querySelector('.js-auto-play-button').innerText = 'Stop Auto Play';
    document.querySelector('.js-auto-play-button').classList.add('autoplay-css');
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-button').innerText = 'Auto Play'
    document.querySelector('.js-auto-play-button').classList.remove('autoplay-css');
    isAutoPlaying = false;
  }
};

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const compMove = pickComp();
  let res = '';
  if (playerMove === 'rock') {
    if (compMove == 'rock') {
      res = 'Tie'
    }
    else if (compMove == 'paper') {
      res = 'You Lose';
    }
    else if (compMove == 'scissors') {
      res = 'You Win'
    }
  }
  else if (playerMove === 'paper') {
    if (compMove == 'rock') {
      res = 'You Win'
    }
    else if (compMove === 'paper') {
      res = 'Tie';
    }
    else if (compMove === 'scissors') {
      res = 'You Lose'
    }
  }
  else if (playerMove === 'scissors') {
    if (compMove == 'rock') {
      res = 'You Lose'
    }
    else if (compMove == 'paper') {
      res = 'You Win';
    }
    else if (compMove == 'scissors') {
      res = 'Tie'
    }
  }

  if (res === 'You Win') {
    score.wins += 1;
  }
  else if (res === 'You Lose') {
    score.loses += 1;
  }
  else {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  document.querySelector('.js-result').innerHTML = `${res}`
  document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${compMove}-emoji.png" class="move-icon">
  Computer`;

}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}

function resetButton() {
  const confirmation = confirm('Are you sure you want to reset your score?');
  if (confirmation) {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  }
}

function pickComp() {
  const randnum = Math.random();
  let compMove = '';
  if (randnum > 0 && randnum < 1 / 3) {
    compMove = 'rock';
  }
  else if (randnum >= 1 / 3 && randnum < 2 / 3) {
    compMove = 'paper';
  }
  else if (randnum >= 2 / 3 && randnum < 1) {
    compMove = 'scissors';
  }
  return compMove;
}