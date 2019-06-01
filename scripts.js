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

// Event listener for game mode buttons
gameModeOptions.forEach(btn => btn.addEventListener('click', setGameMode));

// Set Player Name
// function setPlayerName() {
//   localStorage.setItem('shootoutPlayerName', playerName.value);
//   console.log(localStorage.getItem('shootoutPlayerName'));
//   updateNewGameMessages();
// };

// Set Player Location
// function setPlayerLocation() {
//   localStorage.setItem('shootoutPlayerLocation', playerLocation.value);
//   console.log(localStorage.getItem('shootoutPlayerLocation'));
//   updateNewGameMessages();
// };

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
  console.log(localStorage.getItem('shootoutPlayerName'));
  localStorage.setItem('shootoutPlayerLocation', playerLocation.value);
  console.log(localStorage.getItem('shootoutPlayerLocation'));

  let playerNameIsSet,
      playerLocationIsSet,
      gameModeIsSet

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
  
  if ( playerName.value && playerLocation.value ) {
    playerLocationIsSet = true;
    playerLocationMessage.innerHTML = `I am a chicano hero from the town of ${playerLocation.value}`; 
    gameModeOptions.forEach(option => option.removeAttribute('disabled'));
  } else if ( playerName.value && !playerLocation.value ) {
    playerLocationIsSet = false;
    playerLocationMessage.innerHTML = "";
    gameModeOptions.forEach(option => option.setAttribute('disabled', true));
  } else {
    playerLocationIsSet = false;
    gameModeOptions.forEach(option => option.setAttribute('disabled', true));
  }
  

  updateGameMode = () => {
    // gameMode = localStorage.getItem('shootoutGameMode')
    if ( !gameModeIsSet ) {
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
    } else {
      gameModeIsSet = false;
    }
  }

  updateGameMode()

  localStorage.setItem('playerNameIsSet', playerNameIsSet);
  console.log({playerNameIsSet})
  localStorage.setItem('playerLocationIsSet', playerLocationIsSet);
  console.log({playerLocationIsSet})
  localStorage.setItem('gameModeIsSet', gameModeIsSet);
  console.log({gameModeIsSet})

  if ( playerNameIsSet && playerLocationIsSet && gameModeIsSet ) {
    toRulesScreenBtn.removeAttribute('disabled');
  } else {
    toRulesScreenBtn.setAttribute('disabled', true);
  }
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