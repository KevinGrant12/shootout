const game = document.getElementById('shootout')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

class Card {
  constructor(name, imgUrl, health, ammo) {
    this.name = name
    this.health = health
    this.ammo = ammo
    this.imgUrl = imgUrl
    this.addImages = (card) => {
      let frontFace = new Image()
      frontFace.src = this.imgUrl
      frontFace.className = 'front-face'
      let backFace = new Image()
      backFace.src = 'img/card-back.svg'
      backFace.className = 'back-face'
      card.append(backFace)
      card.append(frontFace)
    }
  }
  createCard(imgUrl) {
    let card = document.createElement('div')
    card.className = 'memory-card ' + this.name
    card.dataset.health = this.health
    card.dataset.ammo = this.ammo
    this.addImages(card)
    return card
  }
}

// Game Mode Configuration
const gameModeToAmounts = new Map([
  ['easy',
    {
      ammo: 4,
      beer: 4,
      food: 2,
      cigar: 0,
      snake: 2,
      scorpion: 2,
      enemigo: 2,
      bandito: 0,
      rival: 0
    }
  ],
  ['medium',
    {
      ammo: 4,
      beer: 4,
      food: 2,
      cigar: 2,
      snake: 2,
      scorpion: 2,
      enemigo: 4,
      bandito: 4,
      rival: 0 
    }
  ],
  ['hard',
    {
      ammo: 4,
      beer: 4,
      food: 4,
      cigar: 4,
      snake: 2,
      scorpion: 2,
      enemigo: 4,
      bandito: 4,
      rival: 4
    }
  ],
]);



// Home Screen Configuration
// ===================================================================================//
const gameModeOptions = document.querySelectorAll('.game-mode-btn');
const toRulesScreenBtn = document.getElementById('toRulesScreen');
let gameMode = "";

const playerName = document.getElementById('playerName');
const playerLocation = document.getElementById('playerLocation');
const playerDetails = document.getElementById('playerDetails');

const gameModeMessage = document.getElementById('gameModeMessage');
const playerNameMessage = document.getElementById('playerNameMessage');
const playerLocationMessage = document.getElementById('playerLocationMessage');

let playerNameIsSet = false;
let playerLocationIsSet = false;
let gameModeIsSet = false;

// Event listener for game mode buttons
gameModeOptions.forEach(btn => btn.addEventListener('click', setGameMode));

// Event listener for rules screen button
toRulesScreenBtn.addEventListener('mouseup', goToRulesScreen)

// Select Game Mode
function setGameMode(e, gameMode) {
  gameMode = e.target.getAttribute('data-mode');
  gameModeOptions.forEach(option => option.classList.remove('active'));
  e.target.classList.add('active');
  localStorage.setItem("shootoutGameMode", gameMode);
  updateNewGameMessages(gameMode);
};

// Update Game Mode Message
function updateNewGameMessages(gameMode) {

  localStorage.setItem('shootoutPlayerName', playerName.value);
  localStorage.setItem('shootoutPlayerLocation', playerLocation.value);
  // console.log(localStorage.getItem('shootoutPlayerName'));
  // console.log(localStorage.getItem('shootoutPlayerLocation'));

  // Toggle playerNameIsSet and update player name message
  if ( playerName.value ) {
    playerNameIsSet = true;
    playerNameMessage.innerHTML = `Muy Buenos! <br> They call me El ${playerName.value}.`;
    playerLocation.removeAttribute('disabled');
  } else {
    playerNameIsSet = false;
    playerNameMessage.innerHTML = "";
    playerLocation.setAttribute('disabled', true);
    gameModeOptions.forEach(option => option.setAttribute('disabled', true));
  }

  // Toggle playerLocationIsSet and update player location message
  if ( playerLocation.value ) {
    playerLocationIsSet = true;
    playerLocationMessage.innerHTML = `I am a chicano hero from the town of ${playerLocation.value}`; 
  } else {
    playerLocationIsSet = false;
    playerLocationMessage.innerHTML = "";
  }
  
  // Unlock gamemode buttons
  if ( playerName.value && playerLocation.value ) {
    gameModeOptions.forEach(option => option.removeAttribute('disabled'));
  } else {
    gameModeOptions.forEach(option => option.setAttribute('disabled', true));
  }

  // Set the game mode message
  switch (gameMode) {
    case "easy":
      gameModeMessage.innerHTML = "I am a sissy girl who thinks Taco Bell hot sauce is spicy. The trail is scary and I will be bringing my mommy...";
      gameModeIsSet = true;
      console.log('easy');
      break;
    case "medium":
      gameModeMessage.innerHTML = "Fancy yourself a sharpshooter?";
      gameModeIsSet = true;
      console.log('medium');
      break;
    case "hard":
      gameModeMessage.innerHTML = 'I am a seasoned traveler who was birthed wielding a revolver with a golden hammer. I will destroy all who stand in my way before you can say "El Chalupa Cabra"';
      gameModeIsSet = true;
      console.log('hard');
      break;
  }

  // Set home screen booleans to local storage
  localStorage.setItem('playerNameIsSet', playerNameIsSet);
  localStorage.setItem('playerLocationIsSet', playerLocationIsSet);
  localStorage.setItem('gameModeIsSet', gameModeIsSet);
  // console.log({playerNameIsSet})
  // console.log({playerLocationIsSet})
  // console.log({gameModeIsSet})

  // Toggle toRulesScreen button
  if ( playerNameIsSet && playerLocationIsSet && gameModeIsSet ) {
    toRulesScreenBtn.removeAttribute('disabled');
  } else {
    toRulesScreenBtn.setAttribute('disabled', true);
  }
};

function goToRulesScreen() {
  document.getElementById('home-screen').classList.remove('active');
  document.getElementById('rules-screen').classList.add('active');
};
  
// ===================================================================================//
// /Home Screen Configuration
          

  
// const cardAmounts = gameModeToAmounts.get(gameMode)
// console.log(gameMode)
// document.querySelector('#gameModeOptions').style.display = 'none'
// dealCards(cardAmounts)
function dealCards(cardAmounts) {
  // Good Cards
  const ammoCards = [...Array(cardAmounts.ammo)].map(i => new Card('ammunition', 'img/react.svg', null, 1).createCard())
  const beerCards = [...Array(cardAmounts.beer)].map(i => new Card('beer', 'img/angular.svg', 1, null).createCard())
  const foodCards = [...Array(cardAmounts.food)].map(i => new Card('food', 'img/angular.svg', 1, null).createCard())
  const cigarCards = [...Array(cardAmounts.cigar)].map(i => new Card('cigar', 'img/ember.svg', 1, null).createCard())

  // Bad Cards
  const snakeCards = [...Array(cardAmounts.snake)].map(i => new Card('snake', 'img/backbone.svg', -1, null).createCard())
  const scorpionCards = [...Array(cardAmounts.scorpion)].map(i => new Card('scorpion', 'img/aurelia.svg', -1, null).createCard())
  const enemigoCards = [...Array(cardAmounts.enemigo)].map(i => new Card('enemigo', 'img/vue.svg', -1, null).createCard())
  const banditoCards = [...Array(cardAmounts.bandito)].map(i => new Card('bandito', 'img/aurelia.svg', -1, null).createCard())
  const rivalCards = [...Array(cardAmounts.rival)].map(i => new Card('rival', 'img/aurelia.svg', -1, null).createCard())

  // Card Collection
  const goodCards = [...ammoCards, ...beerCards, ...foodCards, ...cigarCards]
  const badCards = [...snakeCards, ...scorpionCards, ...enemigoCards, ...banditoCards, ...rivalCards]
  const allCards = [...goodCards, ...badCards]

  // Deal Cards Randomly
  allCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * allCards.length)
    card.style.order = randomPos
    console.log(card)
    game.appendChild(card)
  })
}

function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return

  this.classList.add('flip')

  if (!hasFlippedCard) {
   hasFlippedCard = true
   firstCard = this
   return
  }

  secondCard = this

  checkForMatch()
}

function checkForMatch() {
  let isMatch = firstCard.dataset.cardtype === secondCard.dataset.cardtype
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null,null]
}


// cards.forEach(card => card.addEventListener('click', flipCard))